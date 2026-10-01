import { useState } from "react";
import {
  CheckCircle,
  Edit3,
  Mail,
  Phone,
  Save,
  User,
  X,
  XCircle,
} from "lucide-react";

const INITIAL_PROFILE = {
  name: "Rahul",
  email: "rahul@gmail.com",
  phone: "9876543210",
};

function Profile() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editProfile, setEditProfile] = useState(INITIAL_PROFILE);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hasProfileData = Boolean(
    profile.name || profile.email || profile.phone
  );

  const validateForm = () => {
    const newErrors = {};

    const name = editProfile.name.trim();
    const email = editProfile.email.trim();
    const phone = editProfile.phone.trim();

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (name.length > 80) {
      newErrors.name = "Name must not exceed 80 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleEdit = () => {
    setEditProfile(profile);
    setErrors({});
    clearMessages();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setErrors({});
    clearMessages();
    setIsEditing(false);
  };

  const handleSave = () => {
    clearMessages();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    /*
      TEMPORARY API SIMULATION

      Later replace this with:

      PUT /users/me

      Request:
      {
        name,
        email,
        phone
      }
    */

    setTimeout(() => {
      try {
        const updatedProfile = {
          name: editProfile.name.trim(),
          email: editProfile.email.trim(),
          phone: editProfile.phone.trim(),
        };

        setProfile(updatedProfile);
        setEditProfile(updatedProfile);

        setIsEditing(false);
        setIsLoading(false);
        setErrors({});
        setSuccessMessage("Profile updated successfully.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Profile update error:", error);

        setIsLoading(false);
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
    }, 800);
  };

  const handleFieldChange = (field, value) => {
    setEditProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }

    clearMessages();
  };

  const getInputClassName = (field, hasIcon = false) => `
    w-full rounded-xl border
    bg-[var(--input-bg)]
    py-3 text-[var(--text-primary)]
    outline-none transition
    placeholder:text-[var(--text-muted)]
    disabled:cursor-not-allowed
    disabled:opacity-60
    ${
      hasIcon ? "pl-11 pr-4" : "px-4"
    }
    ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
        : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
    }
  `;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-6 text-[var(--text-primary)] transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <header className="mb-6">
          <p className="text-sm font-semibold text-[var(--primary)]">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
            Manage your personal information and account details.
          </p>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div
            className="
              mb-5 flex items-start gap-3 rounded-xl border
              border-green-500/20 bg-green-500/10
              px-4 py-3 text-sm text-green-700
              dark:text-green-400
            "
            role="status"
            aria-live="polite"
          >
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div
            className="
              mb-5 flex items-start gap-3 rounded-xl border
              border-red-500/20 bg-red-500/10
              px-4 py-3 text-sm text-red-700
              dark:text-red-400
            "
            role="alert"
          >
            <XCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Card */}
        <section
          className="
            overflow-hidden rounded-2xl border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            shadow-[var(--shadow-sm)]
          "
        >
          {/* Profile Header */}
          <div
            className="
              border-b border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              px-5 py-7 sm:px-8
            "
          >
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

              {/* Avatar */}
              <div
                className="
                  flex h-24 w-24 shrink-0 items-center
                  justify-center rounded-full
                  bg-[var(--primary-soft)]
                  text-[var(--primary)]
                  ring-8 ring-[var(--primary-soft)]
                "
              >
                <User size={40} strokeWidth={1.8} />
              </div>

              <div className="mt-4 sm:ml-5 sm:mt-0">
                <h2 className="text-xl font-bold">
                  {profile.name || "User"}
                </h2>

                <p className="mt-1 break-all text-sm text-[var(--text-muted)]">
                  {profile.email || "No email available"}
                </p>

                {!isEditing && profile.phone && (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {!hasProfileData && !isEditing && (
            <div
              className="
                border-b border-[var(--border-color)]
                px-5 py-10 text-center sm:px-8
              "
            >
              <div
                className="
                  mx-auto flex h-14 w-14 items-center
                  justify-center rounded-full
                  bg-[var(--bg-tertiary)]
                  text-[var(--text-muted)]
                "
              >
                <User size={24} />
              </div>

              <h3 className="mt-4 font-semibold">
                No profile information
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--text-muted)]">
                Your profile information is currently unavailable.
              </p>
            </div>
          )}

          {/* Profile Information */}
          <div className="px-5 py-6 sm:px-8">

            {/* Full Name */}
            <div className="mb-5">
              <label
                htmlFor="profile-name"
                className="
                  mb-2 block text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                Full Name
              </label>

              {isEditing ? (
                <>
                  <div className="relative">
                    <User
                      size={18}
                      className="
                        pointer-events-none absolute left-4 top-1/2
                        -translate-y-1/2
                        text-[var(--text-muted)]
                      "
                    />

                    <input
                      id="profile-name"
                      type="text"
                      value={editProfile.name}
                      disabled={isLoading}
                      maxLength={80}
                      onChange={(event) =>
                        handleFieldChange(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name
                          ? "profile-name-error"
                          : undefined
                      }
                      className={getInputClassName("name", true)}
                    />
                  </div>

                  {errors.name && (
                    <p
                      id="profile-name-error"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.name}
                    </p>
                  )}
                </>
              ) : (
                <div
                  className="
                    flex min-h-12 items-center gap-3 rounded-xl
                    border border-[var(--border-color)]
                    bg-[var(--bg-secondary)]
                    px-4
                  "
                >
                  <User
                    size={18}
                    className="shrink-0 text-[var(--text-muted)]"
                  />

                  <span>
                    {profile.name || "Not available"}
                  </span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="profile-email"
                className="
                  mb-2 block text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                Email Address
              </label>

              {isEditing ? (
                <>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="
                        pointer-events-none absolute left-4 top-1/2
                        -translate-y-1/2
                        text-[var(--text-muted)]
                      "
                    />

                    <input
                      id="profile-email"
                      type="email"
                      value={editProfile.email}
                      disabled={isLoading}
                      onChange={(event) =>
                        handleFieldChange(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="Enter your email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email
                          ? "profile-email-error"
                          : undefined
                      }
                      className={getInputClassName("email", true)}
                    />
                  </div>

                  {errors.email && (
                    <p
                      id="profile-email-error"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.email}
                    </p>
                  )}
                </>
              ) : (
                <div
                  className="
                    flex min-h-12 items-center gap-3 rounded-xl
                    border border-[var(--border-color)]
                    bg-[var(--bg-secondary)]
                    px-4
                  "
                >
                  <Mail
                    size={18}
                    className="shrink-0 text-[var(--text-muted)]"
                  />

                  <span className="break-all">
                    {profile.email || "Not available"}
                  </span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="profile-phone"
                className="
                  mb-2 block text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                Phone Number
              </label>

              {isEditing ? (
                <>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="
                        pointer-events-none absolute left-4 top-1/2
                        -translate-y-1/2
                        text-[var(--text-muted)]
                      "
                    />

                    <input
                      id="profile-phone"
                      type="tel"
                      inputMode="numeric"
                      value={editProfile.phone}
                      disabled={isLoading}
                      maxLength={10}
                      onChange={(event) => {
                        const numericValue =
                          event.target.value.replace(/\D/g, "");

                        handleFieldChange(
                          "phone",
                          numericValue
                        );
                      }}
                      placeholder="Enter 10-digit phone number"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone
                          ? "profile-phone-error"
                          : undefined
                      }
                      className={getInputClassName("phone", true)}
                    />
                  </div>

                  {errors.phone && (
                    <p
                      id="profile-phone-error"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.phone}
                    </p>
                  )}
                </>
              ) : (
                <div
                  className="
                    flex min-h-12 items-center gap-3 rounded-xl
                    border border-[var(--border-color)]
                    bg-[var(--bg-secondary)]
                    px-4
                  "
                >
                  <Phone
                    size={18}
                    className="shrink-0 text-[var(--text-muted)]"
                  />

                  <span>
                    {profile.phone || "Not available"}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl bg-[var(--primary)]
                    px-5 py-3 text-sm font-semibold text-white
                    shadow-sm transition
                    hover:opacity-90
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[var(--primary)]/30
                  "
                >
                  <Edit3 size={17} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-xl border
                      border-[var(--border-color)]
                      px-5 py-3 text-sm font-semibold
                      text-[var(--text-primary)]
                      transition
                      hover:bg-[var(--bg-secondary)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[var(--primary)]/30
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-1/2
                    "
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-xl bg-[var(--primary)]
                      px-5 py-3 text-sm font-semibold text-white
                      shadow-sm transition
                      hover:opacity-90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[var(--primary)]/30
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-1/2
                    "
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="
                            h-4 w-4 animate-spin rounded-full
                            border-2 border-white
                            border-t-transparent
                          "
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;