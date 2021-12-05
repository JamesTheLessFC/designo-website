import styles from "../../styles/AdminPage.module.scss";
import { useEffect } from "react";
import { withRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import Footer from "../../components/Footer";
import AdminHeader from "../../components/AdminHeader";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import HeadComponent from "../../components/HeadComponent";

function AdminPage({ router }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [router, status]);

  return (
    <div className={styles.root}>
      <HeadComponent title="Designo - Admin Dashboard" />
      <Navbar />
      <AdminHeader title="Admin Dashboard" icon={faUserShield} />
      <Dashboard />
      <Footer page="admin" />
    </div>
  );
}

export default withRouter(AdminPage);
