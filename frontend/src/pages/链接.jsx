import React,{useEffect,useState} from "react";
import {取} from "../api.js";

export default function 链接(){
  const [类,设类]=useState("号卡套餐");
  const [行,设行]=useState([]);
  const [实名,设实名]=useState(null);
  const 刷=()=>{
    取("/链接/"+encodeURIComponent(类)).then(设行);
    if(类==="号卡客户") 取("/贯验/实名唯一").then(设实名);
  };
  useEffect(()=>{刷();},[类]);
  const 右列=类==="号卡套餐"?"套餐":"客户";
  return (<div>
    <h1 className="题">链接</h1>
    <p className="述">订购 = 号卡 ↔ 套餐；实名 = 号卡 ↔ 客户。两端必须先有枢纽。实名唯一口径：先到保留、后到拒绝，冲突整批失败闭并留证据。</p>
    <div className="行">
      <button className={类==="号卡套餐"?"":"次"} onClick={()=>设类("号卡套餐")}>号卡套餐</button>
      <button className={类==="号卡客户"?"":"次"} onClick={()=>设类("号卡客户")}>号卡客户</button>
      <button className="次" onClick={刷}>刷新</button>
      <span className="徽章 淡">{行.length} 条</span>
    </div>

    {类==="号卡客户" && 实名 && (
      <div className="段">
        <div className="段题">
          实名唯一 · {实名.口径}{" "}
          <span className={`徽章 ${实名.是否全部唯一?"通":"败"}`}>{实名.是否全部唯一?"全部唯一":"存在双有效"}</span>
        </div>
        {!实名.号卡.length ? <div className="空态">尚无实名链接与冲突证据。</div> : (
          <table>
            <thead><tr><th>号卡</th><th>有效客户</th><th>实名链接数</th><th>拒绝证据</th></tr></thead>
            <tbody>{实名.号卡.map(x=>(
              <tr key={x.号卡业务键}>
                <td>{x.号卡业务键}</td>
                <td>{x.异常 ? <span className="徽章 败">{x.异常}</span> : x.有效客户}</td>
                <td>{x.实名链接数}</td>
                <td>{x.证据.length ? x.证据.map((e,i)=>(
                  <div key={i}>拒 {e.冲突客户业务键} · 保 {e.保留客户业务键} · {e.批号} · {e.时刻}</div>
                )) : "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    )}

    {!行.length ? <div className="空态">该类链接尚无记录。</div> : (
      <table>
        <thead><tr><th>哈希键</th><th>号卡</th><th>{右列}</th><th>装载日</th></tr></thead>
        <tbody>{行.map(r=>(
          <tr key={r.哈希键}>
            <td className="哈希">{r.哈希键}</td>
            <td>{r.号卡业务键}</td>
            <td>{r.套餐业务键||r.客户业务键}</td>
            <td>{r.装载日}</td>
          </tr>
        ))}</tbody>
      </table>
    )}
  </div>);
}
