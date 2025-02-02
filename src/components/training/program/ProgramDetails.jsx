import React, { useEffect, useState } from "react";
import TabsRender from "./ProgramTabs";
import { useAuth } from "../../../context/auth";
import BackButton from "./BackButton";
// import { signOut } from "next-auth/react";

function ProgramDetails({

  id,
  setBatchListPop,
  batchData,
  schedulePop,
  setSchedulePop,
  getOneBatch,
}) {
  const [peoplelist, setPeopleList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [programDetails, setProgramDetails] = useState(null);
  const { userData, signOut } = useAuth()
  const [refresher, setRefresher] = useState(null);
  const [templateList, setTemplateList] = useState([]);
  //${process.env.REACT_APP_PUBLIC_URL}/api/Teams/getAllUserInTeam/%7Bid%7D?filter=%7B%22limit%22%3A%22%22,%22start%22%3A%22%22,%22search%22%3A%22%22%7D&access_token=${process.env.REACT_APP_PUBLIC_URL}/api/Teams/getAllUserInTeam/%7Bid%7D?filter=%7B%22limit%22%3A%22%22,%22start%22%3A%22%22,%22search%22%3A%22%22%7D&access_token=
  const getpeoplelist = async () => {
    const formData = { Id: id };
    var response;

    let form = new URLSearchParams(Object.entries(formData)).toString();

    response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/api/Teams/getAllUserInTranieeTeam/%7Bid%7D?filter=%7B%22limit%22%3A${limit},%22start%22%3A${page},%22search%22%3A%22${search}%22%7D&access_token=${userData?.accessToken}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        method: "POST",
        body: form,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = (data && data?.message) || response.statusText;
      return Promise.reject(error);
    } else {
      console.log(data);
      if (data.code === 404) {
        console.error(data.msg);
      } else {
        setPeopleList(data.data);
      }
    }
  };

  const getProgramDetails = async () => { };

  useEffect(() => {
    if (id !== null) {
      getpeoplelist();
      getQuestionData();
      getTemplateData();
    }
  }, [id, batchData, search, limit, page, refresher]);
  // console.log(questionList, "l");
  const getQuestionData = () => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/api/FormBatchquestions/list?filter=%7B%22limit%22%3A${limit},%22start%22%3A${page},%22search%22%3A%22${search}%22%7D&access_token=${userData?.accessToken}`
    )
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setQuestionList(data.data.list);
        setTotalCount(data.data.totalCount);
      })
      .catch((error) => {
        setQuestionList([]);
        console.error("There was an error!", error);
        if (error === "Token Expired") {
          signOut();
        }
      });
  };
  const getTemplateData = () => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/api/templateQuestions/listofTranieeBatchTemplate?filter=%7B%22limit%22%3A2000000,%22start%22%3A%22%22,%22search%22%3A%22%22%7D&access_token=${userData?.accessToken}`
    )
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setTemplateList(data.data.list);
        setTotalCount(data.data.totalCount);
      })
      .catch((error) => {
        setTemplateList([]);
        console.error("There was an error!", error);
        if (error === "Token Expired") {
          signOut();
        }
      });
  };
  const npages = totalCount;
  const pgindex = npages - 5;
  // const pgindex = npages;
  const next = () => {
    if (totalCount % limit == 0) {
      if (page < pgindex) {
        setPage(page + 1);
        //console.log("max page" ,pgindex)
      } else {
        return;
      }
    }

    // if the number is odd
    else {
      if (page < npages) {
        setPage(page + 1);
        //console.log("else max page" ,npages)
      } else {
        return;
      }
    }
  };
  const previous = () => {
    if (page <= 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  return (
    <div className="flex w-full   bg-white rounded-md flex-col">
      <BackButton programId={setBatchListPop} />
      <div className="w-full py-4">
        <span className="flex cursor-pointer items-center justify-between px-5  text-2xl font-semibold text-gray-600   border-gray-200">
          <p>{batchData.programName}</p>
        </span>

        {/* <span className="flex cursor-pointer items-center justify-between px-5  text-2xl font-semibold text-gray-600   border-gray-200">
          <p>{batchData?.programName} </p>
          <div className="flex w-fit space-x-2">

            <Link
              href={`/livebatchtracking/batch&id=${id}&batch&name=${batchData.teamName}&trackingid=${id}`}
            >
              <a target="_blank" rel="noopener noreferrer">
                <button className="flex w-fit px-4 py-2 text-white text-sm font-medium bg-green-500 items-center rounded-md">
                  Live Tracking
                </button>
              </a>
            </Link>
            <Link href={`/batch/${id}`}>
              <a target="_blank" rel="noopener noreferrer">
                <button
                  className="flex w-fit px-6 py-2 text-white text-sm font-medium
          bg-green-500 items-center rounded-md"
                >
                  Reports
                </button>
              </a>
            </Link>
          </div>
        </span> */}
        <TabsRender
          id={id}
          batchData={batchData}
          questionList={questionList}
          peoplelist={peoplelist}
          schedulePop={schedulePop}
          setSchedulePop={setSchedulePop}
          next={next}
          previous={previous}
          pgindex={pgindex}
          page={page}
          totalCount={totalCount}
          setLimit={setLimit}
          setPage={setPage}
          setSearch={setSearch}
          setRefresher={setRefresher}
          templateList={templateList}
          getOneBatch={getOneBatch}
        // session={session}
        />
      </div>
    </div>
  );
}

export default ProgramDetails;
