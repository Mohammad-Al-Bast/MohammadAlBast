import type { CodeSnippet } from "../../components/portfolio/data";

/** Real code from each project, shown in the showcase card on its project page. */
export const brainLearningCenterSnippet: CodeSnippet = {
  filename: "roles.guard.ts",
  language: "typescript",
  code: `@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Public route, no role restriction applied
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUserPayload | undefined;

    // 401 instead of 403 to avoid leaking protected route info
    if (!user) throw new UnauthorizedException();

    const hasRole = required.some((role) => user.roles.includes(role));
    if (!hasRole) throw new UnauthorizedException();

    return true;
  }
}`,
};

export const reactiveStoreSnippet: CodeSnippet = {
  filename: "cart-provider.tsx",
  language: "tsx",
  code: `const STORAGE_KEY = "reactive-store-cart";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let current: CartLine[] | null = null;

function readStored(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => getProduct(l.slug) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

function getSnapshot() {
  if (current === null) current = readStored();
  return current;
}

function getServerSnapshot() {
  return EMPTY;
}

function emit() {
  listeners.forEach((l) => l());
}

function write(next: CartLine[]) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the cart still works for this visit.
  }
  emit();
}`,
};
