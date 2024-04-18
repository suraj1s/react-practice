"use client";
import { useState } from "react";

export interface ISideNavbarItemsType {
  id: number;
  name: string;
  component: JSX.Element;
}
export default function SideNavbar({sideNavbarItems}: {sideNavbarItems: ISideNavbarItemsType[]}) {
  
  const [activeComponent, setactiveComponent] = useState(sideNavbarItems[0]);
  return (
    <div className="bg-slate-950 text-slate-200">
      <div className="flex">
        <div className="w-fit px-2  h-screen py-[50px] border-r-2  border-gray-200 ">
          <ul className=" w-full h-full overflow-auto">
            {sideNavbarItems.map((item, i) => (
              <li
                key={item.id}
                className={` ${
                  i + 1 < sideNavbarItems.length && " border-b-[1px]"
                } pl-5 p-3 border-gray-600 mr-2`}
                onClick={() => setactiveComponent(item)}
              >
                <p
                  className={`${
                    item.id === activeComponent.id &&
                    "border-[1px] !border-gray-400 !rounded-xl bg-slate-900"
                  }  whitespace-nowrap hover:bg-slate-800 hover:cursor-pointer hover:border-[1px] hover:border-gray-400 border-[1px] border-black rounded-xl w-fit px-4 py-2  `}
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 pl-10">
          <div className="flex flex-col  gap-y-5 ">
            <h1 className="text-4xl font-bold pt-5 whitespace-nowrap">{activeComponent.name}</h1>
            <div>{activeComponent.component}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
