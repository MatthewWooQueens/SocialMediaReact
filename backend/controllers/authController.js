

export const getAuth = (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render("index", {
        title: "Express Demo",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    });
}
