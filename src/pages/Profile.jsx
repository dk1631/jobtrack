import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {updateUser} from "../services/applicationService";
import {getCurrentUser,saveUser} from "../utils/storage";

import "../styles/Profile.css";

function Profile() {

  const storedUser = getCurrentUser();

  const [user, setUser] = useState(storedUser);

  const [name, setName] = useState(storedUser?.name || "");

  const [isEditing, setIsEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  async function handleSave() {
    setError("");

    const cleanName = name.trim();

    if (!cleanName) {
      setError("Name cannot be empty.");

      return;
    }

    try {
      setSaving(true);

      const updatedUser = await updateUser(user.id,
          {
            name: cleanName,
          }
        );

      const localUser = {id: updatedUser.id,name: updatedUser.name,email: updatedUser.email,};

      saveUser(localUser);

      setUser(localUser);

      setIsEditing(false);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setName(user.name);

    setError("");

    setIsEditing(false);
  }

  return (
    <MainLayout>

      <div className="page-header">

        <h1>Profile</h1>

        <p>
          View and manage your account information.
        </p>

      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="profile-info">

          <div className="profile-field">

            <span>Full Name</span>

            {isEditing ? (

              <input
                type="text"
                className="profile-input"
                value={name}
                onChange={(event) => setName(event.target.value)
                }
              />

            ) : (

              <strong>
                {user?.name}
              </strong>

            )}

          </div>

          <div className="profile-field">

            <span>Email Address</span>

            <strong>
              {user?.email}
            </strong>

          </div>

        </div>

        <div className="profile-actions">

          {isEditing ? (
            <>
              <button
                className="secondary-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              className="primary-button"
              onClick={() => setIsEditing(true)
              }
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;