import ProfileSidebar from "./ProfileSidebar";
import s from "./ProfileLayout.module.css";

export default function ProfileLayout({ children }) {
  return (
    <div className={s.page}>
      <ProfileSidebar />
      <div className={s.content}>{children}</div>
    </div>
  );
}
