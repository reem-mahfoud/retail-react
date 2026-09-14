import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import { useAddUserForm } from 'hooks/useAddUserForm';
import {
  ChevronDown,
  ChevronRight,
  CloudUpload,
  HelpCircle,
  Phone,
  User,
} from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { CRADLE_CANVAS_BG } from 'design/cradleDesignTokens';

const inputClass =
  'h-11 w-full rounded-xl border border-[#D0D5DD] bg-white px-3.5 text-sm font-medium text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15';

const selectWrap = 'relative';

function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
      strokeWidth={2}
      aria-hidden
    />
  );
}

function SectionLabel({ title, required, description, helpId }) {
  return (
    <div className="shrink-0 lg:w-56">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-sm font-semibold text-[#101828]">{title}</span>
        {required ? (
          <span className="text-sm font-semibold text-[#7F56D9]" aria-hidden>
            *
          </span>
        ) : null}
        <button
          type="button"
          className="inline-flex rounded-full p-0.5 text-[#98A2B3] outline-none hover:text-[#667085] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/40"
          aria-label={`About ${title}`}
          aria-describedby={helpId}
        >
          <HelpCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
      <p id={helpId} className="mt-2 text-sm leading-relaxed text-[#667085]">
        {description}
      </p>
    </div>
  );
}

export default function AddUserMain() {
  const formId = useId();
  const isUniversityAdmin = useIsUniversityAdmin();

  const {
    fileInputRef,
    profileType,
    setProfileType,
    phone,
    setPhone,
    userName,
    setUserName,
    role,
    setRole,
    password,
    setPassword,
    rePassword,
    setRePassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    photoPreview,
    dragOver,
    setDragOver,
    error,
    onFileChange,
    onDrop,
    handleSubmit,
  } = useAddUserForm(isUniversityAdmin);

  return (
    <div
      className={`flex min-h-full flex-col text-[#101828] ${isUniversityAdmin ? CRADLE_CANVAS_BG : 'bg-white'}`}
    >
      <div className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-8 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg p-1 text-[#667085] transition hover:bg-[#EAECF0] hover:text-[#414651] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
            aria-label="Home"
          >
            <HomeOutlineIcon className="h-5 w-5" stroke="#717680" aria-hidden />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={2} aria-hidden />
          <Link
            to="/dashboard/users"
            className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
          >
            Users
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
            Add User
          </span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Add User</h1>
        <p className="mt-2 max-w-2xl text-base text-[#535862] sm:text-lg">
          This page serves as an interface for adding a new user to the system.
        </p>

        <form id={formId} onSubmit={handleSubmit} className="mt-10 space-y-10">
          {error ? (
            <div
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          {/* Profile */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <SectionLabel
              title="Profile"
              required
              description="Enter profile information"
              helpId={`${formId}-profile-help`}
            />
            <div className="min-w-0 flex-1 rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08)] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-profile-type">
                    Profile Type
                  </label>
                  <div className={selectWrap}>
                    <select
                      id="add-profile-type"
                      value={profileType}
                      onChange={(e) => setProfileType(e.target.value)}
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      {!isUniversityAdmin ? <option value="Student">Student</option> : null}
                    </select>
                    <SelectChevron />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-phone">
                    Phone Number <span className="text-[#7F56D9]">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <input
                      id="add-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-username">
                    User Name
                  </label>
                  <input
                    id="add-username"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={inputClass}
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-role">
                    Role
                  </label>
                  <div className={selectWrap}>
                    <select
                      id="add-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={`${inputClass} cursor-pointer appearance-none pr-10 capitalize`}
                    >
                      <option value="admin">Admin</option>
                      <option value="dean">Dean</option>
                      {!isUniversityAdmin ? <option value="teacher">Teacher</option> : null}
                      {!isUniversityAdmin ? <option value="student">Student</option> : null}
                    </select>
                    <SelectChevron />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-password">
                    Password <span className="text-[#7F56D9]">*</span>
                  </label>
                  <input
                    id="add-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-repassword">
                    Re-enter Password <span className="text-[#7F56D9]">*</span>
                  </label>
                  <input
                    id="add-repassword"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    className={inputClass}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <SectionLabel
              title="Personal Information"
              required
              description="Enter personal information about the user"
              helpId={`${formId}-personal-help`}
            />
            <div className="min-w-0 flex-1 rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08)] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-first">
                    First name <span className="text-[#7F56D9]">*</span>
                  </label>
                  <input
                    id="add-first"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#667085]" htmlFor="add-last">
                    Last name <span className="text-[#7F56D9]">*</span>
                  </label>
                  <input
                    id="add-last"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-xs font-medium text-[#667085]">Gender</span>
                  <div className="inline-flex rounded-xl border border-[#D0D5DD] bg-[#F9FAFB] p-1">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        gender === 'male'
                          ? 'bg-[#F4EBFF] text-[#6941C6] shadow-sm'
                          : 'text-[#667085] hover:text-[#344054]'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        gender === 'female'
                          ? 'bg-[#F4EBFF] text-[#6941C6] shadow-sm'
                          : 'text-[#667085] hover:text-[#344054]'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-[#98A2B3]" strokeWidth={1.5} aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="sr-only"
                    onChange={onFileChange}
                    aria-label="Upload profile picture"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={`flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 transition ${
                      dragOver
                        ? 'border-[#7F56D9] bg-[#F9F5FF]'
                        : 'border-[#D0D5DD] bg-[#FAFAFA] hover:border-[#98A2B3]'
                    }`}
                  >
                    <CloudUpload className="h-10 w-10 text-[#98A2B3]" strokeWidth={1.5} aria-hidden />
                    <span className="mt-3 text-center text-sm font-semibold text-[#7F56D9]">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-1 text-center text-xs text-[#667085]">JPG (max. 800×800px)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <footer className="sticky bottom-0 z-10 mt-auto border-t border-[#EAECF0] bg-white px-4 py-4 shadow-[0_-4px_24px_-4px_rgba(16,24,40,0.06)] sm:px-8">
        <div className="mx-auto flex max-w-[1100px] justify-end gap-3">
          <Link
            to="/dashboard/users"
            className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-[#D0D5DD] bg-white px-6 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form={formId}
            className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-[#6941C6] bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Add User
          </button>
        </div>
      </footer>
    </div>
  );
}
