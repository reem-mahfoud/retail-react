import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prependExtraUser } from 'lib/usersExtraStorage';
import { nameAvatarUrl } from 'lib/nameAvatarUrl';

function roleToBadges(roleValue) {
  const map = {
    admin: [{ key: 'admin', label: 'Admin' }],
    teacher: [{ key: 'teacher', label: 'Teacher' }],
    dean: [{ key: 'dean', label: 'Dean' }],
    student: [{ key: 'student', label: 'Student' }],
  };
  return map[roleValue] ?? map.admin;
}

/** Add user page: profile/personal fields, photo, validation, prepend to extra users. */
export function useAddUserForm(isUniversityAdmin) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileType, setProfileType] = useState('Admin');
  const [phone, setPhone] = useState('+998 (33) 408 28 08');
  const [userName, setUserName] = useState('Olivia');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstName, setFirstName] = useState('Olivia');
  const [lastName, setLastName] = useState('Rhye');
  const [gender, setGender] = useState('male');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isUniversityAdmin) return;
    setProfileType((cur) => (cur === 'Student' ? 'Admin' : cur));
    setRole((cur) => (cur === 'student' || cur === 'teacher' ? 'admin' : cur));
  }, [isUniversityAdmin]);

  const applyFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    // Read as a data URL so the uploaded photo survives navigation/reload
    // (blob: URLs are revoked and lost once the page unloads).
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) applyFile(f);
    },
    [applyFile],
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) applyFile(f);
    },
    [applyFile],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      const u = userName.trim();
      const fn = firstName.trim();
      const ln = lastName.trim();
      const ph = phone.trim();
      if (!u || !fn || !ln || !ph) {
        setError('Please fill in all required fields.');
        return;
      }
      if (!password) {
        setError('Password is required.');
        return;
      }
      if (password !== rePassword) {
        setError('Passwords do not match.');
        return;
      }
      const handle =
        u
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^a-z0-9._-]/g, '') || `user${Date.now()}`;
      const addedUser = {
        id: `u-${Date.now()}`,
        name: `${fn} ${ln}`.trim(),
        handle,
        avatar: photoPreview || nameAvatarUrl(handle),
        roles: roleToBadges(role),
        profileType,
        phone: ph,
        lastSession: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      prependExtraUser(addedUser);
      navigate('/dashboard/users');
    },
    [firstName, lastName, navigate, password, phone, photoPreview, profileType, rePassword, role, userName],
  );

  return {
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
  };
}
