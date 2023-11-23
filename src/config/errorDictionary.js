const ERROR_DICTIONARY = {
  notFoundOne: { status: 404, message: 'Not found document' },
  notFound: { status: 404, message: 'Not found documents' },
  incomplete: { status: 400, message: 'Incomplete values' },
  auth: { status: 401, message: 'Invalid credentials' },
  forbidden: { status: 403, message: 'Not allowed' },
  registered: { status: 403, message: 'Email already registered' },
  default: { status: 500, message: 'Error handling data' },
};

export default ERROR_DICTIONARY;
