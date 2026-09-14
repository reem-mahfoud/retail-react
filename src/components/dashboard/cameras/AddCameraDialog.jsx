import CameraFormDialog, { EMPTY_CAMERA_FORM_DEFAULTS } from './CameraFormDialog';

export default function AddCameraDialog({ open, onClose, onConfirm }) {
  return (
    <CameraFormDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Add camera"
      primaryLabel="Add"
      defaultValues={EMPTY_CAMERA_FORM_DEFAULTS}
      formPrefix="add-camera"
      titleId="add-camera-title"
      descId="add-camera-desc"
    />
  );
}
