import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { RemovalPolicy } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

type StaticSiteProps = {
  domainName: string;
  siteSubDomain?: string;
};

export class StaticSite extends Construct {
  cachePolicy: cloudfront.CachePolicy;
  responseHeadersPolicy: cloudfront.ResponseHeadersPolicy;

  constructor(scope: Construct, id: string, { domainName, siteSubDomain }: StaticSiteProps) {
    super(scope, id);
    this.cachePolicy = new cloudfront.CachePolicy(this, 'HTMLCachePolicy', {
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });
    this.responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(this, 'HTMLCacheControl', {
      customHeadersBehavior: {
        customHeaders: [
          {
            header: 'Cache-Control',
            value: 'max-age=3600',
            override: true,
          },
          {
            header: 'Content-Type',
            value: 'text/html',
            override: true,
          },
        ],
      },
    });

    const siteDomain = this.#getSiteDomain(domainName, siteSubDomain);

    const siteBucket = new s3.Bucket(this, 'bucket', {
      bucketName: siteDomain,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'cert',
      'arn:aws:acm:us-east-1:670799836323:certificate/28826456-e703-4658-9de4-006846add9ef',
    );

    const origin = origins.S3BucketOrigin.withOriginAccessControl(siteBucket);

    const cdn = new cloudfront.Distribution(this, 'distribution', {
      certificate,
      defaultRootObject: 'index',
      domainNames: [siteDomain],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        origin,
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: new cloudfront.ResponseHeadersPolicy(this, 'CacheControl', {
          customHeadersBehavior: {
            customHeaders: [
              {
                header: 'Cache-Control',
                value: 'max-age=86400, stale-while-revalidate=604800, public',
                override: true,
              },
            ],
          },
        }),
      },
    });

    cdn.addBehavior('/index', origin, this.#createBehaviorOptions());
    cdn.addBehavior('/snake', origin, this.#createBehaviorOptions());
    cdn.addBehavior('/about', origin, this.#createBehaviorOptions());
    cdn.addBehavior('/blog', origin, this.#createBehaviorOptions());

    new s3deploy.BucketDeployment(this, 'deploy-with-invalidation', {
      sources: [s3deploy.Source.asset('./dist/')],
      destinationBucket: siteBucket,
      distribution: cdn,
      distributionPaths: ['/*'], // TODO: optimize path invalidation
    });
  }

  #getSiteDomain(domainName: string, siteSubdomain?: string): string {
    if (siteSubdomain == null) {
      return domainName;
    }
    return `${domainName}.${siteSubdomain}`;
  }

  #createBehaviorOptions(): cloudfront.AddBehaviorOptions {
    return {
      compress: true,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      cachePolicy: this.cachePolicy,
      responseHeadersPolicy: this.responseHeadersPolicy,
    };
  }
}
