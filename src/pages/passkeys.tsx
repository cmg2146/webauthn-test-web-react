import Layout from "@/components/layouts/Layout";
import RequireAuth from "@/components/RequireAuth";
import UserPasskeys from "@/components/UserPasskeys";

export default function Passkeys() {
  return (
    <RequireAuth>
      <Layout headerTitle="Passkeys">
        <UserPasskeys className="flex-grow bg-white" />
      </Layout>
    </RequireAuth>
  );
}
