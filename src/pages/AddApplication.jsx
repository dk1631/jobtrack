import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {addApplication,} from "../services/applicationService";

import {getCurrentUser,} from "../utils/storage";

import "../styles/Application.css";

function AddApplication() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !company.trim() ||
      !role.trim() ||
      !status ||
      !appliedDate
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    const newApplication = {
      userId: user.id,
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      status,
      appliedDate,
      jobLink: jobLink.trim(),
      notes: notes.trim(),
    };

    try {
      setLoading(true);

      await addApplication(newApplication);

      navigate("/applications");

    } catch (error) {
      console.error(error);

      setError(
        "Unable to add application. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <MainLayout>

      <div className="page-header">
        <div>
          <h1>Add Application</h1>

          <p>
            Add a job application to your tracker.
          </p>
        </div>
      </div>

      <div className="application-form-card">

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="form-row">

            <div className="form-group">
              <label>
                Company *
              </label>

              <input
                type="text"
                placeholder="Example: Zoho"
                value={company}
                required
                onChange={(event) =>
                  setCompany(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                Job Role *
              </label>

              <input
                type="text"
                placeholder="Example: Frontend Developer"
                value={role}
                required
                onChange={(event) =>
                  setRole(event.target.value)
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>
                Location
              </label>

              <input
                type="text"
                placeholder="Example: Chennai"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                Status *
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="Applied">
                  Applied
                </option>

                <option value="Assessment">
                  Assessment
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>
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
                required
                onChange={(event) =>
                  setAppliedDate(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                Job Link
              </label>

              <input
                type="url"
                placeholder="https://..."
                value={jobLink}
                onChange={(event) =>
                  setJobLink(event.target.value)
                }
              />
            </div>

          </div>

          <div className="form-group">
            <label>
              Notes
            </label>

            <textarea
              rows="5"
              placeholder="Add notes about this application..."
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
            />
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate("/applications")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Add Application"}
            </button>

          </div>

        </form>

      </div>

    </MainLayout>
  );
}

export default AddApplication;