/**
 * Stage 1 MVP는 로컬 저장소 기반으로 동작합니다.
 * Stage 2에서 아래 팩토리 함수로 Supabase client를 주입하도록 설계합니다.
 */
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const getSupabaseConfig = (): SupabaseConfig => ({
  url: import.meta.env.VITE_SUPABASE_URL ?? '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
});
