import Layout from "@/components/layouts/Layout";
import RequireAuth from "@/components/RequireAuth";
import UserPasskeys from "@/components/UserPasskeys";

export default function Passkeys() {
  return (
    <RequireAuth>
      <Layout>
        <UserPasskeys className="h-screen flex-grow bg-white overflow-y-auto" />
      </Layout>
    </RequireAuth>
  );
}
