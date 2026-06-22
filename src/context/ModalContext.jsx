import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState(null);

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      setModalConfig({
        message,
        title: options.title || 'Confirmation',
        confirmLabel: options.confirmLabel || 'Confirmer',
        cancelLabel: options.cancelLabel || 'Annuler',
        type: options.type || 'danger', // 'danger' or 'info'
        resolve: (value) => {
          setModalConfig(null);
          resolve(value);
        }
      });
    });
  }, []);

  return (
    <ModalContext.Provider value={confirm}>
      {children}
      {modalConfig && (
        <ConfirmationModal
          isOpen={!!modalConfig}
          onClose={() => modalConfig.resolve(false)}
          onConfirm={() => modalConfig.resolve(true)}
          title={modalConfig.title}
          message={modalConfig.message}
          confirmLabel={modalConfig.confirmLabel}
          cancelLabel={modalConfig.cancelLabel}
          type={modalConfig.type}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ModalProvider');
  }
  return context;
};
