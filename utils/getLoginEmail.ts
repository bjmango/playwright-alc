export function getLoginEmail(
  config: any,
  accountName: string,
  accountType: string,
  user?: string
): string {
  const account = config?.[accountType]?.[accountName];
  const loginEmail: string | undefined = user ? account?.users?.[user]?.email : account?.email;

  if (!loginEmail) {
    throw new Error(`Login email for account "${user || 'mainAccount'}" is not defined.`);
  }

  return loginEmail;
}
