import React, { useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";

export default function PasswordSection() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowChangePassword(true)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Change Password
      </button>

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
}
