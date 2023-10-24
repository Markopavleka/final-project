<div>
  {user ? (
    <>
      <div>{user.username}</div>
      <LogoutButton />
    </>
  ) : (
    <>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </>
  )}
</div>;

const cookieStore = cookies();
const sessionToken = cookieStore.get('sessionToken');

const user = sessionToken && (await getUserBySessionToken(sessionToken.value));
