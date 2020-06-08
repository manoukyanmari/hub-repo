let Error404 = {
    render : async () => {
        let view = `
            <section class="section">
                <h1> Error 404: Page not found </h1>
            </section>`
        return view
    },
    after_render: async () => {}

}

export default Error404;