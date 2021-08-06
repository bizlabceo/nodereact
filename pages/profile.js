import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const profile = () => {
  const followingList = [{ nickname: "heny" }, { nickname: "heny" }];
  const followerList = [{ nickname: "heny" }, { nickname: "heny" }];

  return (
    <>
      <Head>
        <title>내프로필 profile에서 보낸거야</title>
      </Head>

      <AppLayout>
        <NicknameEditForm />
        profile
        <FollowList header="followerlist" data={followerList} />
        <FollowList header="followingList" data={followingList} />
      </AppLayout>
    </>
  );
};

export default profile;
