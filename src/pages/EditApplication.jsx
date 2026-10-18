import {useEffect, useState,} from "react";
import {useNavigate, useParams,} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {getApplicationById, updateApplication,} from "../services/applicationService";
import {getCurrentUser,} from "../utils/storage";
import "../styles/Application.css";

function EditApplication() {

  const { id } = useParams();

  const navigate = useNavigate();

  const user = getCurrentUser();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplication() {
      try {
        const data = await getApplicationById(id);

        if (data.userId !== user.id) {
          setError("You do not have access to this application.");
          return;
        }

        setCompany(data.company || "");
        setRole(data.role || "");
        setLocation(data.location || "");
        setStatus(data.status || "Applied");
        setAppliedDate(data.appliedDate || "");
        setJobLink(data.jobLink || "");
        setNotes(data.notes || "");

      } catch (error) {
        console.error(error);

        setError("Unable to load application.");

      } finally {
        setLoading(false);
      }
    }

    loadApplication();

  }, [id, user.id]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !company.trim() ||
      !role.trim() ||
      !appliedDate
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    const updatedData = {
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      status,
      appliedDate,
      jobLink: jobLink.trim(),
      notes: notes.trim(),
    };

    try {
      setSaving(true);

      await updateApplication(id,updatedData);

      navigate(`/applications/${id}`);

    } catch (error) {
      console.error(error);

      setError("Unable to update application.");

    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <p>Loading application...</p>
      </MainLayout>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <MainLayout>

      <div className="page-header">
        <h1>Edit Application</h1>

        <p>
          Update your job application details.
        </p>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!error && (
        <div className="application-form-card">

          <form
            className="application-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label>Company *</label>

                <input
                  type="text"
                  value={company}
                  onChange={(event) =>
                    setCompany(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Job Role *</label>

                <input
                  type="text"
                  value={role}
                  onChange={(event) =>
                    setRole(
                      event.target.value
                    )
                  }
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Status *</label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value
                    )
                  }
                >
                  <option value="Applied">Applied</option>

                  <option value="Assessment">Assessment</option>

                  <option value="Interview">Interview</option>

                  <option value="Offer">Offer</option>

                  <option value="Rejected">Rejected</option>
                </select>
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>
                  Applied Date *
                </label>

                <input
                  type="date"
                  max={today}
                  value={appliedDate}
                  onChange={(event) =>
                    setAppliedDate(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Job Link</label>

                <input
                  type="url"
                  value={jobLink}
                  onChange={(event) =>
                    setJobLink(
                      event.target.value
                    )
                  }
                />
              </div>

            </div>

            <div className="form-group">

              <label>Notes</label>

              <textarea
                rows="5"
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target.value
                  )
                }
              />

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  navigate(
                    `/applications/${id}`
                  )
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>
      )}

    </MainLayout>
  );
}

export default EditApplication;