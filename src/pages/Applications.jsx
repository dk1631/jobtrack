import {useEffect,useState,} from "react";
import {Link,} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {getApplicationsByUser,} from "../services/applicationService";
import {getCurrentUser,} from "../utils/storage";
import "../styles/Application.css";

function Applications() {

  const user = getCurrentUser();

  const [applications, setApplications] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      try {
        setLoading(true);

        const data = await getApplicationsByUser(user.id);
        setApplications(data);


      } catch (error) {
        console.error(error);

        setError(
          "Unable to load applications."
        );

      } finally {
        setLoading(false);
      }
    }

    loadApplications();

  }, [user.id]);

  const filteredApplications = applications.filter((application) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch = application.company.toLowerCase().includes(search) || 
                          application.role.toLowerCase().includes(search) || 
                          (application.location || "").toLowerCase().includes(search);

    const matchesStatus = statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {

      if (sortBy === "newest") {
        return (
          new Date(b.appliedDate) - new Date(a.appliedDate)
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.appliedDate) - new Date(b.appliedDate)
        );
      }

      if (sortBy === "companyAZ") {
        return a.company.localeCompare(b.company);
      }

      if (sortBy === "companyZA") {
        return b.company.localeCompare(a.company);
      }

      return 0;
    }
  );

  function formatDate(dateString) {
    if (!dateString) {
      return "-";
    }

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <MainLayout>

      <div className="page-header applications-header">

        <div>
          <h1>Applications</h1>

          <p>
            Manage all your job applications.
          </p>
        </div>

        <Link to="/applications/add" className="primary-button">+ Add Application</Link>

      </div>

      <div className="application-controls">

        <input
          type="text"
          className="search-input"
          placeholder="Search by company or role or location..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Status</option>

          <option value="Applied">Applied</option>

          <option value="Assessment">Assessment</option>

          <option value="Interview">Interview</option>

          <option value="Offer">Offer</option>

          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)
          }
        >
          <option value="newest">Newest First</option>

          <option value="oldest">Oldest First</option>

          <option value="companyAZ">Company A-Z</option>

          <option value="companyZA">Company Z-A</option>
        </select>
      </div>

      {loading && (
        <p>Loading applications...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && applications.length === 0 && (

          <div className="empty-state">

            <h3>
              No applications yet
            </h3>

            <p>
              Start tracking your job search
              by adding your first application.
            </p>

            <Link
              to="/applications/add"
              className="primary-button"
            >
              Add Application
            </Link>

          </div>
        )}

        {!loading && !error && applications.length > 0 && sortedApplications.length === 0 && (

          <div className="empty-state">

            <h3>
              No matching applications
            </h3>

            <p>
              Try changing your search
              or status filter.
            </p>

          </div>
        )}

      {!loading && !error && sortedApplications.length > 0 && (

          <div className="applications-table-wrapper">

            <table className="applications-table">

              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedApplications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.company}</td>
                      <td>{application.role}</td>
                      <td>{application.location || "-"}</td>
                      <td><span className={`status-badge ${application.status.toLowerCase()}`}>{application.status}</span></td>
                      <td>{formatDate(application.appliedDate)}</td>
                      <td><Link to={`/applications/${application.id}`}className="view-button">View</Link></td>
                    </tr>
                  )
                )}
              </tbody>

            </table>

          </div>

        )}

    </MainLayout>
  );
}

export default Applications;