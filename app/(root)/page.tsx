"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getSession, getUserInfo } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [loggedInUser, setLoggedInUser] =
    useState<getLoggedInUserInfoProps | null>(null);
  useEffect(() => {
    const currentSession = async () => {
      const session = await getSession();
      console.log("NowSession", session);
      const loggedIn = await getUserInfo(session);
      console.log("loggedInUser", loggedInUser);
      setLoggedInUser(loggedIn);
    };
    currentSession();
  }, []);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedInUser?.name || "Guest"}
            subtext="Access and manage your account and transactions effiiciantly."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      {/* <RightSidebar
        user={loggedInUser}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500.5 }]}
      /> */}
    </section>
  );
};

export default Home;
