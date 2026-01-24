export class CredentialError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CredentialError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AccessDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccessDeniedError';
  }
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class RegionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegionError';
  }
}

export class FormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormatError';
  }
}

export class OptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OptionError';
  }
}
