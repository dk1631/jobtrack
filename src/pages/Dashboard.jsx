import {useEffect,useState,} from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import {getApplicationsByUser,} from "../services/applicationService";
import {getCurrentUser,} from "../utils/storage";
import {Link} from 'react-router-dom'

function Dashboard() {

  const user = getCurrentUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadApplications() {

      try {

        const data = await getApplicationsByUser(user.id);

        setApplications(data);

      } catch (error) {

        console.error("Dashboard error:",error);

      } finally {

        setLoading(false);

      }

    }

    loadApplications();

  }, [user.id]);

  const totalApplications = applications.length;

  const appliedCount = applications.filter((application) =>
        application.status === "Applied"
    ).length;

  const assessmentCount = applications.filter((application) =>
      application.status === "Assessment"
  ).length;

  const interviewCount = applications.filter((application) =>
        application.status === "Interview"
    ).length;

  const offerCount = applications.filter((application) =>
        application.status === "Offer"
    ).length;

  const rejectedCount = applications.filter((application) =>
        application.status === "Rejected"
    ).length;

  return (
    <MainLayout>

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back, {user?.name}! Here's
            an overview of your job search.
          </p>
        </div>

      </div>

      <div className="dashboard-actions">

        <Link
          to="/applications/add"
          className="primary-button"
        >
          + Add Application
        </Link>

        <Link
          to="/applications"
          className="secondary-link-button"
        >
          View Applications
        </Link>

      </div>
      {loading ? (

        <p>
          Loading dashboard...
        </p>

      ) : (

        <div className="stats-grid">

          <StatCard title="Total Applications" value={totalApplications}/>

          <StatCard title="Applied" value={appliedCount}/>

          <StatCard title="Assessments" value={assessmentCount}/>

          <StatCard title="Interviews" value={interviewCount}/>

          <StatCard title="Offers" value={offerCount}/>

          <StatCard title="Rejected" value={rejectedCount}/>

        </div>

      )}

    </MainLayout>
  );
}

export default Dashboard;