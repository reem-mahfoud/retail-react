import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEdgeDeviceToStorage } from 'lib/edgeDevicesStorage';

/** Add edge device form: fields, certificate drop zone, connection test, save to storage. */
export function useAddEdgeDeviceDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [testDialog, setTestDialog] = useState({ open: false, variant: 'success' });

  const [deviceName, setDeviceName] = useState('Raspberry Pi 5 - Main Hall');
  const [deviceType, setDeviceType] = useState('Student');
  const [assignedBuilding, setAssignedBuilding] = useState('Student');
  const [activeFrom, setActiveFrom] = useState('00:00');
  const [activeTo, setActiveTo] = useState('23:59');
  const [description, setDescription] = useState('');
  const [activePeriodOpen, setActivePeriodOpen] = useState(false);

  const [ipAddress, setIpAddress] = useState('121212');
  const [macAddress, setMacAddress] = useState('121212');

  const [cpuArchitecture, setCpuArchitecture] = useState('');
  const [gpuSpecifications, setGpuSpecifications] = useState('');
  const [memory, setMemory] = useState('');
  const [storage, setStorage] = useState('');

  const [registrationToken, setRegistrationToken] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [dropActive, setDropActive] = useState(false);

  const closeTestDialog = useCallback(() => {
    setTestDialog((prev) => ({ ...prev, open: false }));
  }, []);

  const onCertificateFiles = useCallback((files) => {
    const f = files?.[0];
    if (f) setCertificateFile(f);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDropActive(false);
      onCertificateFiles(e.dataTransfer?.files);
    },
    [onCertificateFiles],
  );

  const handleTest = useCallback(() => {
    const looksValid =
      String(ipAddress || '').trim().length >= 7 &&
      String(macAddress || '').trim().length >= 8 &&
      String(registrationToken || '').trim().length >= 4;

    setTestDialog({ open: true, variant: looksValid ? 'success' : 'error' });
  }, [ipAddress, macAddress, registrationToken]);

  const handleSave = useCallback(() => {
    const newDevice = {
      id: `${Date.now()}`,
      title: deviceName?.trim() || 'New edge device',
      quotaUsed: 0,
      quotaTotal: 25,
      tagId: registrationToken?.trim() || '1:0.0.0-demo',
      active: true,
      meta: {
        deviceType,
        assignedBuilding,
        activeFrom,
        activeTo,
        description,
        ipAddress,
        macAddress,
        cpuArchitecture,
        gpuSpecifications,
        memory,
        storage,
        certificate: certificateFile?.name ?? null,
      },
    };

    addEdgeDeviceToStorage(newDevice);
    navigate('/dashboard/edge-devices');
  }, [
    activeFrom,
    activeTo,
    assignedBuilding,
    certificateFile,
    cpuArchitecture,
    description,
    deviceName,
    deviceType,
    gpuSpecifications,
    ipAddress,
    macAddress,
    memory,
    navigate,
    registrationToken,
    storage,
  ]);

  return {
    fileInputRef,
    testDialog,
    setTestDialog,
    closeTestDialog,
    deviceName,
    setDeviceName,
    deviceType,
    setDeviceType,
    assignedBuilding,
    setAssignedBuilding,
    activeFrom,
    setActiveFrom,
    activeTo,
    setActiveTo,
    description,
    setDescription,
    activePeriodOpen,
    setActivePeriodOpen,
    ipAddress,
    setIpAddress,
    macAddress,
    setMacAddress,
    cpuArchitecture,
    setCpuArchitecture,
    gpuSpecifications,
    setGpuSpecifications,
    memory,
    setMemory,
    storage,
    setStorage,
    registrationToken,
    setRegistrationToken,
    certificateFile,
    dropActive,
    setDropActive,
    onCertificateFiles,
    onDrop,
    handleTest,
    handleSave,
    navigate,
  };
}
