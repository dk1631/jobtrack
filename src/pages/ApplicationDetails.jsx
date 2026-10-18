import {useEffect,useState,} from "react";
import {Link,useNavigate,useParams,} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {getApplicationById,deleteApplication} from "../services/applicationService";
import {getCurrentUser,} from "../utils/storage";
import "../styles/Application.css";

function ApplicationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = getCurrentUser();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadApplication() {
      try {
        const data = await getApplicationById(id);

        if (data.userId !== user.id) {
          setError("You do not have access to this application.");

          return;   
        }

        setApplication(data);

      } catch (error) {
        console.error(error);

        setError("Unable to load application.");

      } finally {
        setLoading(false);
      }
    }

    loadApplication();

  }, [id, user.id]);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading application...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>

        <div className="error-message">
          {error}
        </div>

      </MainLayout>
    );
  }
  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this application?");

    if (!confirmed) {
        return;
    }

    try {
        setDeleting(true);

        await deleteApplication(id);

        navigate("/applications");

    } catch (error) {
        console.error(error);

        setError("Unable to delete application.");

        setDeleting(false);
    }
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "-";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }



  return (
    <MainLayout>

      <div className="page-header details-header">

        <div>
          <h1>
            Application Details
          </h1>

          <p>
            View your job application information.
          </p>
        </div>

        <div className="details-actions">

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/applications")
            }
          >
            Back
          </button>

          <Link
            to={`/applications/${application.id}/edit`}
            className="primary-button"
          >
            Edit
          </Link>

          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={deleting}
            >
            {deleting
                ? "Deleting..."
                : "Delete"}
           </button>

        </div>

      </div>

      <div className="details-card">

        <div className="detail-item">
          <span>Company</span>
          <strong>
            {application.company}
          </strong>
        </div>

        <div className="detail-item">
          <span>Job Role</span>
          <strong>
            {application.role}
          </strong>
        </div>

        <div className="detail-item">
          <span>Location</span>
          <strong>
            {application.location || "-"}
          </strong>
        </div>

        <div className="detail-item">
          <span>Status</span>

          <div>
            <span
              className={`status-badge ${application.status.toLowerCase()}`}
            >
              {application.status}
            </span>
          </div>
        </div>

        <div className="detail-item">
          <span>Applied Date</span>

          <strong>
            {formatDate(application.appliedDate)  }
          </strong>
        </div>

        <div className="detail-item">
          <span>Job Link</span>

          {application.jobLink ? (
            <a href={application.jobLink}
              target="_blank"
              rel="noreferrer"
              className="job-link"
            >
              Open Job Posting
            </a>
          ) : (
            <strong>-</strong>
          )}
        </div>

        <div className="detail-item full-width">
          <span>Notes</span>

          <p>
            {application.notes ||
              "No notes added."}
          </p>
        </div>

      </div>

    </MainLayout>
  );
}

export default ApplicationDetails;