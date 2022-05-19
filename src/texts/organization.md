The core building block of MST's user interface is React components. In MST, there are several components pre-defined for you that can either be used as-is, or modified to fit the particular needs of your product.

<img src="/assets/react_view_layers.png" style="object-fit: contain" />

Components in MST are split into three directories, nested under the /ui directory at the root of the project:

* /ui/layouts - Components that are responsible for building layouts that combine a set of static elements (e.g., the application's navigation bar) with dynamic elements. There are two layout in MST - dashboard layout, main layout. the layout components are used to render every page in the application.
* /ui/pages - Components that are compositions of other components, rendered within the dynamic portion of a layout component and corresponding to a particular route in the application (e.g., the /login route renders the <span class="badge">< Login /></span> page component). Some page components are wrapped with Apollo component enhancers to provide them with data via GraphQL.
* /ui/components - Standalone components that can be used independently or composed together with other components in a page.
* /ui/sections - In MST, each pages consist of several sections.