let Footer = {
    render: async () => {
        let view =  /*html*/`
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                   © Copyrights Reserved. GitHuBox Corporation. INN. Community Free Software
                </p>
            </div>
        </footer>
        `
        return view
    },
    after_render: async () => { }

}

export default Footer;