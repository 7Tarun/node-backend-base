import { httpCode } from "../constants/httpCodes";
import { IResponse } from "../interface/IResponse";

export const responseWrapper = ({
  res,
  status = 500,
  message = "Something went wrong",
  data,
  errors,
  page,
  per_page,
  total,
}: IResponse) => {
  try {
    res.status(Number(status)).json({
      status,
      message,
      data,
      errors,
      page,
      per_page,
      total,
    });
  } catch (error) {
    res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      errors: error,
    });
  }
};
