import { IntlShape} from "react-intl";
const DisplayErrorMessage = (error?: any, intl?: IntlShape,language?:string) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl?.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };

export default DisplayErrorMessage;