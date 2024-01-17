import useRentModal from "@/app/hooks/useRentHook";
import Modal from "./Modal";

const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
      title="Airbnb your home!"
    />
  );
};

export default RentModal;
