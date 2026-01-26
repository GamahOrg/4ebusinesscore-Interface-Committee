export const getColorClass = (color: any) => {
    switch (color) {
      case "احمر":
      case "red":
      case 0:
      case "0":
        return "danger";
      case "ازرق":
      case "blue":
        return "primary";
      case "اخضر":
      case "green":
      case 1:
      case "1":
        return "success";
      case "اصفر":
      case "yellow":
      case 2:
      case "2":
        return "warning";
      default:
        return "";
    }
  };