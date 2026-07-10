export default function LoginPage() {
  return (
    <main id="main-content" className="utilityPage loginPage">
      <p className="sectionEyebrow">Reference-only account state</p>
      <h1>Log in</h1>
      <form className="loginForm">
        <label htmlFor="email">Email</label><input id="email" type="email" />
        <label htmlFor="password">Password</label><input id="password" type="password" />
        <button className="darkButton" type="button">Log in</button>
      </form>
    </main>
  );
}

