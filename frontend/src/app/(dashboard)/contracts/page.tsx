import Link from "next/link";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import extractUserInfo from "@/utils/verify";
import { FileAddOutlined } from "@ant-design/icons";
import ContractTable from "@/components/tables/ContractTable";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/contract`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Contracts() {
  const contracts = await getData();
  console.log(contracts);
  const { permissions } = await extractUserInfo();
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {permissions.includes("CREATE_CONTRACTOR") && (
          <Link href={"/contracts/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <FileAddOutlined /> Add Contract
            </button>
          </Link>
        )}
        <h2 className="text-admin text-2xl font-bold mb-10">
          <FileAddOutlined /> Contract List:{" "}
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        <ContractTable contracts={contracts} />
      </div>
    </div>
  );
}
