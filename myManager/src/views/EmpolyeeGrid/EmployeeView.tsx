import React from "react";
import { useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";
import { motion } from "framer-motion";
import { IEmpData } from "../../shared/list.type";
import roleImg from "../../assets/role.svg";
import phoneImg from "../../assets/phone.svg";
import mailImg from "../../assets/email.svg";
import userImg from "../../assets/user.svg";
import editImg from '../../assets/edit.svg';

function GridView({ empList }: {
  empList: IEmpData[];
}) {
  const navigate = useNavigate();
  return (
    <motion.div className="d-flex justify-between items-center flex-wrap">
      {empList.map(
        ({ id, name, role, personal_mail_id, phone_number }, idx) => (
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 0.975 }}
            whileTap={{ scale: 1.925 }}
            key={id}
            transition={{ delay: 0.3 * idx, duration: 0.5 }}
            className={"shadow-sm p-2 cursor-pointr "}
            onClick={() => navigate(`/form/${id}`)}
          >
            <div className="flex flex-col h-auto w-[210px] items-start justify-start gap-2 rounded-md ">
              <div className="font-semibold text-base first-letter:uppercase d-flex justify-start gap-2 items-center">
                <img src={userImg} height={16} width={16} />
                <div>{name}</div>
                <img src={editImg} height={16} width={16} className="hover:scale-[1.5] cursor-pointer" />
              </div>
              <div className="font-normal text-sm text-slate-500  border-b relative bottom-2 border-slate-500">
                {id}
              </div>
              <div className="font-normal text-base d-flex justify-start gap-2 items-center">
                <img src={roleImg} height={16} width={16} />
                <div>{role}</div>
              </div>
              <div className="font-normal text-base d-flex justify-start gap-2 items-center">
                <img src={mailImg} height={16} width={16} />

                <div>{personal_mail_id}</div>
              </div>
              <div className="font-normal text-base d-flex justify-start gap-2 items-center">
                <img src={phoneImg} height={16} width={16} />

                <div>{phone_number}</div>
              </div>
            </div>
          </motion.div>
        )
      )}
    </motion.div>
  );
}

export default GridView;
