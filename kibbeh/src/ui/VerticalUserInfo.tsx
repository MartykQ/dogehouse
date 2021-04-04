import { BaseUser } from "@dogehouse/kebab";
import normalizeUrl from "normalize-url";
import React from "react";
import { linkRegex } from "../lib/constants";
import { kFormatter } from "../lib/kFormatter";
import { ApiPreloadLink } from "../shared-components/ApiPreloadLink";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { SingleUser } from "./UserAvatar";

interface VerticalUserInfoProps {
  user: BaseUser;
}

export const VerticalUserInfo: React.FC<VerticalUserInfoProps> = ({ user }) => {
  const { t } = useTypeSafeTranslation();
  return (
    <div className="flex-col rounded-8 pt-5 px-6 pb-4 w-full items-center">
      <SingleUser
        size="default"
        src={user.avatarUrl}
        username={user.username}
      />
      <div className="mt-2">
        <span className="text-primary-100 font-bold h-full break-all line-clamp-1">
          {user.displayName}
        </span>
        <span className="text-primary-300 ml-1">@{user.username}</span>
        {/* <Badges badges={badges} /> */}
      </div>
      <div className="mt-2">
        <div>
          <ApiPreloadLink route="following" data={{ username: user.username }}>
            <span className="text-primary-100 font-bold">
              {kFormatter(user.numFollowers)}
            </span>{" "}
            <span className="text-primary-300 ml-1">
              {t("pages.viewUser.followers")}
            </span>
          </ApiPreloadLink>
        </div>
        <div className="ml-4">
          <ApiPreloadLink route="followers" data={{ username: user.username }}>
            <span className="text-primary-100 font-bold">
              {kFormatter(user.numFollowing)}
            </span>
            <span className="text-primary-300 ml-1">
              {" "}
              {t("pages.viewUser.following")}
            </span>
          </ApiPreloadLink>
        </div>
      </div>
      <div className="w-full mt-2">
        <p className="text-primary-300 mt-2 text-center w-full whitespace-pre-wrap break-words inline">
          {user.bio.split(/\n/).map((line, i) => (
            <span key={i} className="flex justify-center">
              {line.split(" ").map((chunk, j) => {
                try {
                  return linkRegex.test(chunk) ? (
                    <a
                      href={normalizeUrl(chunk)}
                      rel="noreferrer"
                      className="text-accent text-center hover:underline inline"
                      key={`${i}${j}`}
                      target="_blank"
                    >
                      {chunk}&nbsp;
                    </a>
                  ) : (
                    `${chunk} `
                  );
                } catch (err) {}
              })}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
