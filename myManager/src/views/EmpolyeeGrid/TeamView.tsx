import React from "react";
import dropdown from '../../assets/dropdown.svg';
import { motion } from "framer-motion";
import { team_id } from "../../shared/constants/categories";



function TeamView({ selectedTeamId, onSelectTeam }: { selectedTeamId: string , onSelectTeam: (id: string) => void}) {

    return (
        <motion.div 
          className="d-flex justify-between items-center flex-wrap"
        >
            {
                team_id.map(({ id, label }, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: "100px" }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 0.975 }}
                    whileTap={{ scale: 1.925 }}
                    key={id}
                    transition={{ delay: 0.3 * idx, duration: 0.5, stiffness: 100 }}
                    className={`${ selectedTeamId === id ? "bg-orange-100" : "bg-[#edf1f5] border-[#7c97b4b3]"} border rounded-lg shadow-sm p-2 w-32 cursor-pointer focus:border-blue-700`}
                    onClick={() => onSelectTeam(id)}
                   >
                    <div className="text-sm text-truncate">{label}</div>
                    <img src={dropdown} height={20} width={20}/>
                  </motion.div>
                ))
            }

        </motion.div>
    )
}

export default TeamView;