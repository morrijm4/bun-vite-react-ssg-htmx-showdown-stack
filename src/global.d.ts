import 'typed-htmx';

declare global {
    namespace React {
        interface HTMLAttributes extends HtmxAttributes {}
    }
}
