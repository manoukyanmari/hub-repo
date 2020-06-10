let Header = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container-nav">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img src="../img/logo.png" width="84" height="102">
                        </a>
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item" href="/#/users">
                                About
                            </a>
                            <a class="navbar-item" href="/#/repositories">
                                Secret
                            </a>
                        </div>                       
                    </div>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => { }

}

export default Header;