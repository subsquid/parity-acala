export class NotFoundError extends Error {
  constructor(entityName: string, metaData?: Record<string, any>) {
    super(
      `Entity [${entityName}] was not found!; Metadata [${JSON.stringify(
        metaData
      )}]`
    );
  }
}

export class VersionNotSupported extends Error {
  constructor(eventName: string, metaData?: Record<string, any>) {
    super(
      `Event [${eventName}] of this version is not supported; Metadata [${JSON.stringify(
        metaData
      )}]`
    );
  }
}
