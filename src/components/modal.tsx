import { memo } from "react";

const Z_INDEX = "z-10";

export type ModalProps = {
  title?: string | undefined;
  onClose: () => void;
  zIndex?: string;
  children: React.ReactNode;
  footer?: React.ReactNode | undefined;
};

const defaultProps ={
  zIndex:Z_INDEX
};

function Modal(props: Readonly<ModalProps>) {
  const { title, onClose, zIndex, children, footer } = {...defaultProps,...props};

  return (
    <div
      className={`relative ${zIndex}`}
      aria-labelledby={title || "dialog"}
      role="dialog"
      aria-modal="true"
    >
      {/* background */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className={`fixed inset-0 ${zIndex} w-screen overflow-y-auto`}>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* modal */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
            {/* header */}
            <div className="bg-gray-50 p-2">
              <div className="sm:flex sm:items-center sm:justify-end">
                <div className="mx-auto sm:order-last sm:self-start flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-4 sm:w-4">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    onClick={onClose}
                  >
                    <text x="8" y="16">
                      X
                    </text>
                  </svg>
                </div>
                {title && (
                  <div className="sm:grow mt-3 text-center sm:ml-4 sm:mt-0">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
            {/* body */}
            <div className="bg-white text-black overflow-y-auto h-96 sm:h-64 p-4 pb-4 pt-5 sm:p-6 mb-2">
              {children}
            </div>
            {/* footer */}
            {footer && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
