import PropTypes from "prop-types";
import { STORAGE_URL } from "../constants/urls";
import Image from "next/image";

export default function Error({ customMessage }) {
  return (
    <div className="error-wrapper">
      <div>
        <Image
          src={`${STORAGE_URL}/alien.png`}
          alt=""
          aria-hidden={true}
          width={132}
          height={96}
        />
      </div>
      <span>{customMessage}</span>
    </div>
  );
}

Error.propTypes = {
  customMessage: PropTypes.node,
};

Error.defaultProps = {
  customMessage: "Site maintenance, hopefully back soon!",
};
