const Navbar = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()

        localStorage.removeItem('user')
        window.location.href = '/'
    }
    return (
        <div className="navbar p-6">
  <div className="navbar-start">
    <a className="btn btn-ghost text-2xl font-bold">{props.page}</a>
  </div>
  <div className="navbar-end">
    <a type="button" className="btn btn-outline btn-error rounded-xl" onClick={handleLogout}>Log Out</a>
  </div>
</div>
    )
}

export default Navbar