/* ------------------------------------------------------------------
   Wang Bill Zhu — personal site
   Publication data + tab rendering. Single source of truth so that
   one publication can appear in multiple groupings without duplication.
   ------------------------------------------------------------------ */

// Project-type and domain tag IDs. Kept short so they round-trip cleanly
// through dataset attributes if we ever serialize them to HTML.
const PROJECT_TYPES = {
  "eval":     "Evaluation & Benchmarks",
  "verifiable-llm":  "Robust/Verifiable LLM Systems",
};

const DOMAINS = {
  "language":    "Classical NLP",
  "multimodal":  "Multimodal",
  "health":      "Health, Medical & Social/Cognitive",
  "embodied":    "Embodied & Robotics",
  "coding":      "Coding & Agentic",
};

// Author-homepage lookup. Anyone listed here gets a hyperlinked name.
// Use the exact display string so the renderer can do a flat dictionary
// match without any normalization.
const AUTHOR_PAGES = {
  // Advisors and recurring collaborators
  "Robin Jia":           "https://robinjia.github.io/",
  "Jesse Thomason":      "https://jessethomason.com/",
  "Fei Sha":             "https://www.feisha.org/",
  "Greg Mori":           "https://www.cs.sfu.ca/~mori/",
  "Oliver Schulte":      "https://www.cs.sfu.ca/~oschulte/",
  "Miaosen Chai":          "https://www.linkedin.com/in/miaosen/",
  "Shangshang Wang":       "https://shangshang-wang.github.io/",
  "Yejia Liu":             "https://www.linkedin.com/in/yejia-liu-159410113/",
  "Song Bian":             "https://waterpine.github.io/",
  "Honghua Dong":          "https://dhh1995.github.io/",
  "Liancheng Gong":        "https://krystalgong.github.io/",
  "Tianqi Chen":           "https://www.linkedin.com/in/tianqi-chen-27a722227/",
  "Xinyan Velocity Yu":    "https://velocitycavalry.github.io/",
  "Ruishan Liu":           "https://viterbi-web.usc.edu/~ruishanl/",
  "Jade Law":              "https://health.usnews.com/doctors/jade-law-2358334",
  "Ching Ying Lin":        "https://health.usnews.com/doctors/ching-ying-lin-2532862",
  "Mazen Jizzini":         "https://health.usnews.com/doctors/mazen-jizzini-2389064",
  "Jorge J. Nieva":        "https://profiles.sc-ctsi.org/jorge.nieva.2",
  "Ang Li":                "https://leonlixyz.github.io/",
  "Charles Wang":          "https://charleslwang.github.io/",
  "Kaiyu Yue":             "https://kaiyuyue.com/",
  "Zikui Cai":             "https://zikuicai.github.io/",
  "Ollie Liu":             "https://ollieliu.com/",
  "Peng Guo":              "https://pengguo.net/",
  "Kristina Toutanova":    "https://www.kristinatoutanova.com/",
  "Alekh Agarwal":         "https://alekhagarwal.net/",
  "Mandar Joshi":          "https://homes.cs.washington.edu/~mandar90/",
  "Peter Shaw":            "https://www.ptshaw.com/",
  "Tal Linzen":            "https://tallinzen.net/",
  "Hexiang Hu":            "https://hexiang-hu.github.io/",
  "Jiacheng Chen":         "https://jcchen.me/",
  "Peter Anderson":        "https://panderson.me/",
  "Stefan Lee":            "https://web.engr.oregonstate.edu/~leestef/",
  "Jacob Krantz":          "https://jacobkrantz.github.io/",
  "Shurjo Banerjee":       "https://shurjobanerjee.github.io/",
  "Xin Luna Dong":         "https://lunadong.com/",
  "Kai Sun":               "https://www.kaisun.org/",
  "Seungwhan Moon":        "https://shanemoon.com/",
  "Zhaojiang Lin":         "https://zlinao.github.io/",
  "Anuj Kumar":            "https://www.linkedin.com/in/anujkumar9/",
  "Yi Lu":                 "https://www.linkedin.com/in/yi-lu-b14636a3/",
  "Kanika Narang":         "https://www.linkedin.com/in/kanika-narang-phd-4b2b1a30/",
  "Mustafa Canim":         "https://www.linkedin.com/in/mustafacanim/",
  "Yue Liu":               "https://www.linkedin.com/in/yliuc/",
  "Deqing Fu":             "https://deqingfu.github.io/",
  "Ishika Singh":          "https://ishikasingh.github.io/",
  "Willie Neiswanger":     "https://willieneis.github.io/",
  "Sai Praneeth Karimireddy": "https://spkreddy.org/",
  "Tom Goldstein":         "https://www.cs.umd.edu/~tomg/",
  "Furong Huang":          "https://furong-huang.com/",
  "Micah Goldblum":        "https://goldblum.github.io/",
  "Vatsal Sharan":         "https://vatsalsharan.github.io/",
  "Souti Chattopadhyay":   "https://viterbi.usc.edu/directory/faculty/Chattopadhyay/Souti",
  "Mukund Raghothaman":    "https://mukundraghothaman.github.io/",
  "Li Zhang":              "https://zharry29.github.io/",
  "Shaolei Ren":           "https://intra.ece.ucr.edu/~sren/",
  "Eugene Ie":             "https://research.google/people/eugene-ie/",
  "Guiliang Liu":          "https://guiliang.me/",
  "Jason Corso":           "https://web.eecs.umich.edu/~jjcorso/",
  "Wenhu Chen":            "https://wenhuchen.github.io/",
  "Xiang Yue":             "https://xiangyue9607.github.io/",
  "Lawrence Chen":         "https://www.linkedin.com/in/lawrencechen98/",
  "Tong Xiao":             "https://xiaotong.me/",
  "Pengchuan Zhang":       "https://pzzhang.github.io/pzzhang/",
  "Sherman Siu":           "https://www.linkedin.com/in/real-sherman-siu/",
  "Bohan Lyu":             "https://lyubh.cn/",
  "Dongfu Jiang":          "https://jdf-prog.github.io/",
  "Yuan Liu":              "https://yuanliuuuuuu.github.io/",
  "Yuansheng Ni":          "https://yuanshengni.github.io/",
  "Zhengqing Wang":        "https://eric-zqwang.github.io/",
  "Ziyan Jiang":           "https://xmhzz2018.github.io/",
  "Ming Li":               "https://scholar.google.com/citations?user=M4ojgE4AAAAJ&hl=zh-CN",
  "Rui Wang":              "https://theruiwang.github.io/",
  "Guan Pang":             "https://www.linkedin.com/in/guan-pang-38aaaa29/",
  "Yuxiang Lai":           "https://www.linkedin.com/in/yuxiang-lai-335528276/",
  "Jike Zhong":            "https://jike338.github.io/",
  "Kaipeng Zhang":         "https://kpzhang93.github.io/",
  "Zhiwei Deng":           "https://lucas2012.github.io/",
  "Vihan Jain":            "https://www.linkedin.com/in/vihanjain/",
  "Yuan Huang":            "https://yuanhuanghuang.github.io/",
  "Tengxiao Liu":          "https://tengxiaoliu.github.io/",
  "Taiwei Shi":            "https://taiweis.com/",
  "Linxin Song":           "https://linxins.net/",
  "Yuqing Yang":           "https://ayyyq.github.io/",
  "Xingjian Dong":         "https://dannydxj.github.io/",
  "Ziyi Liu":              "https://liuziyi219.github.io/",
  "Nathanael Fast":        "https://www.nathanaelfast.com/",
  "Ravi Iyer":             "https://www.marshall.usc.edu/people/ravi-iyer",
  "Jacob Choi":            "https://www.linkedin.com/in/choi-jacob/",
  "Sadra Sabouri":         "https://sadrasabouri.github.io/",
  "Qiutong Tony Yi":       "https://www.linkedin.com/in/qiutong-yi-249005250/",
  "Shuying Cao":           "https://www.linkedin.com/in/shuying-cao-0ab112234/",
  "Amirmohammad Nazari":   "https://amirmohammadnazari.github.io/",
  "Qingcan Li":            "https://tiffanyqcli.me/",
  "Amin Banayeeanzade":    "https://aminbana.github.io/",
  "Haoquan Zhang":         "https://haoquanzhang.github.io/",
  "Shitian Zhao":          "https://openreview.net/profile?id=~Shitian_Zhao1",
  // OpenReview profiles for authors without a personal homepage
  "Tianhao Liang":         "https://openreview.net/profile?id=~Tianhao_Liang2",
  "Kai Wang":              "https://openreview.net/profile?id=~Kai_Wang39",
  "Yubo Wang":             "https://openreview.net/profile?id=~Yubo_Wang9",
  "Xuan He":               "https://openreview.net/profile?id=~Xuan_He6",
};

// Each publication is one entry. The "selected" flag controls inclusion in
// the tag-filtered tabs; when false the paper appears only in the full list.
// Authors in the "authors" array are rendered via authorLink(). Two
// sentinels stand in for the user's name so updates only happen here:
//   ME      → "Wang Bill Zhu"   (regular authorship)
//   ME_EQ   → "Wang Bill Zhu*"  (equal-contribution co-first authorship)
// Preprints live in this same list — they are flagged via venue starting
// with "Preprint" and distributed across the taxonomy filters by tags.
const ME    = "__me__";
const ME_EQ = "__me_eq__";

const publications = [
  // 2026 preprints ------------------------------------------------------
  {
    id: "eudaimonia",
    year: 2026,
    title: "EUDAIMONIA: Evaluating Undesirable Dynamics in AI",
    authors: ["Jun Rui Huang*", ME_EQ, "Ziyi Liu", "Nathanael Fast",
              "Ravi Iyer", "Robin Jia"],
    venue: "Preprint, 2026",
    selected: true,
    project_types: ["eval"],
    domains: ["health"],
    links: { paper: "https://arxiv.org/abs/2605.30654" },
    bib: String.raw`@article{huang-etal-2026-eudaimonia,
  title={{EUDAIMONIA}: Evaluating Undesirable Dynamics in {AI}},
  author={Huang, Jun Rui and Zhu, Wang Bill and Liu, Ziyi and Fast, Nathanael and Iyer, Ravi and Jia, Robin},
  journal={arXiv preprint arXiv:2605.30654},
  year={2026}
}`,
    },
  {
    id: "pddl-mind",
    year: 2026,
    title: "PDDL-Mind: Large Language Models are Capable on Belief Reasoning with Reliable State Tracking",
    authors: ["Qiutong Tony Yi*", ME_EQ,
              "Robin Jia", "Jesse Thomason"],
    venue: "Preprint, 2026",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["health"],
    links: { paper: "https://arxiv.org/abs/2604.17819" },
    bib: String.raw`@article{yi-etal-2026-pddl,
  title={{PDDL-Mind}: Large Language Models are Capable on Belief Reasoning with Reliable State Tracking},
  author={Yi, Qiutong Tony and Zhu, Wang Bill and Jia, Robin and Thomason, Jesse},
  journal={arXiv preprint arXiv:2604.17819},
  year={2026}
}`,
    },
  {
    id: "self-evolving-mem",
    year: 2026,
    title: "Self-Evolving LLM Memory Extraction Across Heterogeneous Tasks",
    authors: ["Yuqing Yang", "Tengxiao Liu", ME, "Taiwei Shi", "Linxin Song", "Robin Jia"],
    venue: "Preprint, 2026",
    selected: true,
    project_types: ["eval"],
    domains: ["coding", "language"],
    links: { paper: "https://arxiv.org/abs/2604.11610" },
    bib: String.raw`@article{yang-etal-2026-self,
  title={Self-Evolving {LLM} Memory Extraction Across Heterogeneous Tasks},
  author={Yang, Yuqing and Liu, Tengxiao and Zhu, Wang Bill and Shi, Taiwei and Song, Linxin and Jia, Robin},
  journal={arXiv preprint arXiv:2604.11610},
  year={2026}
}`,
    },

  {
    id: "precise-debug",
    year: 2026,
    title: "Precise Debugging Benchmark: Is Your Model Debugging or Regenerating?",
    authors: [ME_EQ, "Miaosen Chai*",
              "Shangshang Wang", "Yejia Liu", "Song Bian", "Honghua Dong",
              "Willie Neiswanger", "Robin Jia"],
    venue: "Preprint, 2026",
    selected: true,
    project_types: ["eval"],
    domains: ["coding"],
    links: {
      paper: "https://arxiv.org/abs/2604.17338",
      site:  "https://precise-debugging-benchmark.github.io/",
      code:  "https://github.com/Bill1235813/PDB",
      data:  "https://huggingface.co/Precise-Debugging-Benchmarking",
    },
    bib: String.raw`@article{zhu-etal-2026-precise,
  title={Precise Debugging Benchmark: Is Your Model Debugging or Regenerating?},
  author={Zhu, Wang Bill and Chai, Miaosen and Wang, Shangshang and Liu, Yejia and Bian, Song and Dong, Honghua and Neiswanger, Willie and Jia, Robin},
  journal={arXiv preprint arXiv:2604.17338},
  year={2026}
}`,
    },

  // 2026 ----------------------------------------------------------------
  {
    id: "context-leak",
    year: 2026,
    title: "ContextLeak: Auditing Leakage in Private In-Context Learning Methods",
    authors: ["Jacob Choi", "Shuying Cao", "Xingjian Dong",
              "Amin Banayeeanzade", ME, "Robin Jia",
              "Sai Praneeth Karimireddy"],
    venue: "COLM, 2026",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["language"],
    links: { paper: "https://arxiv.org/abs/2512.16059" },
    bib: String.raw`@inproceedings{choi-etal-2026-contextleak,
  title={{ContextLeak}: Auditing Leakage in Private In-Context Learning Methods},
  author={Choi, Jacob and Cao, Shuying and Dong, Xingjian and Banayeeanzade, Amin and Zhu, Wang Bill and Jia, Robin and Karimireddy, Sai Praneeth},
  booktitle={Conference on Language Modeling (COLM)},
  year={2026},
  url={https://arxiv.org/abs/2512.16059}
}`,
    },
  {
    id: "synth-prog-analyzers",
    year: 2026,
    title: "Synthesizing Complex Program Analyzers from Natural Language Questions",
    authors: ["Amirmohammad Nazari", "Sadra Sabouri", ME, "Robin Jia",
              "Souti Chattopadhyay", "Mukund Raghothaman"],
    venue: "VL/HCC, 2026",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["coding"],
    links: { paper: "https://arxiv.org/abs/2605.09304" },
    bib: String.raw`@inproceedings{nazari-etal-2026-synthesizing,
  title={Synthesizing Complex Program Analyzers from Natural Language Questions},
  author={Nazari, Amirmohammad and Sabouri, Sadra and Zhu, Wang Bill and Jia, Robin and Chattopadhyay, Souti and Raghothaman, Mukund},
  booktitle={IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC)},
  year={2026},
  url={https://arxiv.org/abs/2605.09304}
}`,
    },
  {
    id: "pddlego-plus",
    year: 2026,
    title: "Zero-Shot Iterative Formalization and Planning in Partially Observable Environments",
    authors: ["Liancheng Gong", ME, "Jesse Thomason", "Li Zhang"],
    venue: "Findings of ACL, 2026",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["language", "coding"],
    links: {
      paper: "https://arxiv.org/abs/2505.13126",
    },
    bib: String.raw`@inproceedings{gong-etal-2026-zero,
  title={Zero-Shot Iterative Formalization and Planning in Partially Observable Environments},
  author={Gong, Liancheng and Zhu, Wang Bill and Thomason, Jesse and Zhang, Li},
  booktitle={Findings of the Association for Computational Linguistics: ACL 2026},
  year={2026},
  url={https://arxiv.org/abs/2505.13126}
}`,
    },
  {
    id: "psalm-v",
    year: 2026,
    title: "PSALM-V: Automating Symbolic Planning in Interactive Visual Environments with Large Language Models",
    authors: [ME, "Miaosen Chai", "Ishika Singh", "Robin Jia", "Jesse Thomason"],
    venue: "ICRA, 2026",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["embodied", "multimodal", "coding"],
    links: {
      paper: "https://arxiv.org/abs/2506.20097",
      site:  "https://psalmv.github.io/",
    },
    bib: String.raw`@inproceedings{zhu-etal-2026-psalm,
  title={{PSALM-V}: Automating Symbolic Planning in Interactive Visual Environments with Large Language Models},
  author={Zhu, Wang Bill and Chai, Miaosen and Singh, Ishika and Jia, Robin and Thomason, Jesse},
  booktitle={IEEE International Conference on Robotics and Automation (ICRA)},
  year={2026},
  url={https://arxiv.org/abs/2506.20097}
}`,
    },
  {
    id: "cancer-myth",
    year: 2026,
    title: "Cancer-Myth: Evaluating AI Chatbot on Patient Questions with False Presuppositions",
    authors: [ME, "Tianqi Chen", "Xinyan Velocity Yu", "Ching Ying Lin", "Jade Law",
              "Mazen Jizzini", "Jorge J. Nieva", "Ruishan Liu", "Robin Jia"],
    venue: "ICLR, 2026",
    selected: true,
    project_types: ["eval"],
    domains: ["health"],
    links: {
      paper: "https://arxiv.org/abs/2504.11373",
      site:  "https://cancermyth.github.io/",
      code:  "https://github.com/Bill1235813/cancer-myth",
      data:  "https://huggingface.co/datasets/Cancer-Myth/Cancer-Myth",
    },
    bib: String.raw`@inproceedings{zhu-etal-2026-cancer,
  title={Cancer-Myth: Evaluating {AI} Chatbot on Patient Questions with False Presuppositions},
  author={Zhu, Wang Bill and Chen, Tianqi and Yu, Xinyan Velocity and Lin, Ching Ying and Law, Jade and Jizzini, Mazen and Nieva, Jorge J. and Liu, Ruishan and Jia, Robin},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2026},
  url={https://arxiv.org/abs/2504.11373}
}`,
    },
  {
    id: "zebra-cot",
    year: 2026,
    title: "Zebra-CoT: A Dataset for Interleaved Vision Language Reasoning",
    authors: ["Ang Li", "Charles Wang", "Deqing Fu", "Kaiyu Yue", "Zikui Cai",
              ME, "Ollie Liu", "Peng Guo", "Willie Neiswanger", "Furong Huang",
              "Tom Goldstein", "Micah Goldblum"],
    venue: "ICLR, 2026",
    selected: true,
    project_types: ["eval"],
    domains: ["multimodal"],
    links: {
      paper: "https://arxiv.org/abs/2507.16746",
    },
    bib: String.raw`@inproceedings{li-etal-2026-zebra,
  title={Zebra-CoT: A Dataset for Interleaved Vision Language Reasoning},
  author={Li, Ang and Wang, Charles and Fu, Deqing and Yue, Kaiyu and Cai, Zikui and Zhu, Wang Bill and Liu, Ollie and Guo, Peng and Neiswanger, Willie and Huang, Furong and Goldstein, Tom and Goldblum, Micah},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2026},
  url={https://arxiv.org/abs/2507.16746}
}`,
    },

  // 2025 ----------------------------------------------------------------
  {
    id: "visuallens",
    year: 2025,
    title: "VisualLens: Personalization through Visual History",
    authors: [ME, "Deqing Fu", "Kai Sun", "Yi Lu", "Zhaojiang Lin", "Seungwhan Moon",
              "Kanika Narang", "Mustafa Canim", "Yue Liu", "Anuj Kumar", "Xin Luna Dong"],
    venue: "NeurIPS, 2025",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["multimodal"],
    links: {
      paper: "https://arxiv.org/abs/2411.16034",
    },
    bib: String.raw`@inproceedings{zhu-etal-2025-visuallens,
  title={{VisualLens}: Personalization through Visual History},
  author={Zhu, Wang Bill and Fu, Deqing and Sun, Kai and Lu, Yi and Lin, Zhaojiang and Moon, Seungwhan and Narang, Kanika and Canim, Mustafa and Liu, Yue and Kumar, Anuj and Dong, Xin Luna},
  booktitle={Conference on Neural Information Processing Systems (NeurIPS)},
  year={2025},
  url={https://arxiv.org/abs/2411.16034}
}`,
    },
  {
    id: "think-or-not",
    year: 2025,
    title: "Think or Not Think: A Study of Explicit Thinking in Rule-Based Visual Reinforcement Fine-Tuning",
    authors: ["Ming Li", "Jike Zhong", "Shitian Zhao", "Yuxiang Lai", "Haoquan Zhang",
              ME, "Kaipeng Zhang"],
    venue: "NeurIPS, 2025",
    selected: true,
    project_types: ["eval"],
    domains: ["multimodal"],
    links: {
      paper: "https://arxiv.org/abs/2503.16188",
      code:  "https://github.com/minglllli/CLS-RL",
    },
    bib: String.raw`@inproceedings{li-etal-2025-think,
  title={Think or Not Think: A Study of Explicit Thinking in Rule-Based Visual Reinforcement Fine-Tuning},
  author={Li, Ming and Zhong, Jike and Zhao, Shitian and Lai, Yuxiang and Zhang, Haoquan and Zhu, Wang Bill and Zhang, Kaipeng},
  booktitle={Conference on Neural Information Processing Systems (NeurIPS)},
  year={2025},
  url={https://arxiv.org/abs/2503.16188}
}`,
    },
  {
    id: "psalm",
    year: 2025,
    title: "Language Models can Infer Action Semantics for Classical Planners from Environment Feedback",
    authors: [ME, "Ishika Singh", "Robin Jia", "Jesse Thomason"],
    venue: "NAACL, 2025",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["coding", "language"],
    links: {
      paper: "https://aclanthology.org/2025.naacl-long.440/",
      preprint: "https://arxiv.org/abs/2406.02791",
      code:  "https://github.com/Bill1235813/PSALM",
    },
    bib: String.raw`@inproceedings{zhu-etal-2025-language,
  title={Language Models can Infer Action Semantics for Classical Planners from Environment Feedback},
  author={Zhu, Wang Bill and Singh, Ishika and Jia, Robin and Thomason, Jesse},
  booktitle={North American Chapter of the Association for Computational Linguistics (NAACL)},
  year={2025},
  url={https://arxiv.org/abs/2406.02791}
}`,
    },
  {
    id: "tldr",
    year: 2025,
    title: "TLDR: Token-Level Detective Reward Model for Large Vision Language Models",
    authors: ["Deqing Fu", "Tong Xiao", "Rui Wang", ME, "Pengchuan Zhang", "Guan Pang",
              "Robin Jia", "Lawrence Chen"],
    venue: "ICLR, 2025",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["multimodal"],
    links: {
      paper: "https://arxiv.org/abs/2410.04734",
    },
    bib: String.raw`@inproceedings{fu-etal-2025-tldr,
  title={{TLDR}: Token-Level Detective Reward Model for Large Vision Language Models},
  author={Fu, Deqing and Xiao, Tong and Wang, Rui and Zhu, Wang and Zhang, Pengchuan and Pang, Guan and Jia, Robin and Chen, Lawrence},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2025},
  url={https://arxiv.org/abs/2410.04734}
}`,
    },
  {
    id: "mega-bench",
    year: 2025,
    title: "Mega-Bench: Scaling Multimodal Evaluation to Over 500 Real-World Tasks",
    authors: ["Jiacheng Chen", "Tianhao Liang", "Sherman Siu", "Zhengqing Wang",
              "Kai Wang", "Yubo Wang", "Yuansheng Ni", ME, "Ziyan Jiang", "Bohan Lyu",
              "Dongfu Jiang", "Xuan He", "Yuan Liu", "Hexiang Hu", "Xiang Yue",
              "Wenhu Chen"],
    venue: "ICLR, 2025",
    selected: true,
    project_types: ["eval"],
    domains: ["multimodal"],
    links: {
      paper: "https://arxiv.org/abs/2410.10563",
      site:  "https://tiger-ai-lab.github.io/MEGA-Bench/",
      code:  "https://github.com/TIGER-AI-Lab/MEGA-Bench",
    },
    bib: String.raw`@inproceedings{chen-etal-2025-mega,
  title={{Mega-Bench}: Scaling Multimodal Evaluation to Over 500 Real-World Tasks},
  author={Chen, Jiacheng and Liang, Tianhao and Siu, Sherman and Wang, Zhengqing and Wang, Kai and Wang, Yubo and Ni, Yuansheng and Zhu, Wang and Jiang, Ziyan and Lyu, Bohan and Jiang, Dongfu and He, Xuan and Liu, Yuan and Hu, Hexiang and Yue, Xiang and Chen, Wenhu},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2025},
  url={https://arxiv.org/abs/2410.10563}
}`,
    },

  // 2024 ----------------------------------------------------------------
  {
    id: "rationale-distill",
    year: 2024,
    title: "Efficient End-to-End Visual Document Understanding with Rationale Distillation",
    authors: [ME, "Alekh Agarwal", "Mandar Joshi", "Robin Jia", "Jesse Thomason",
              "Kristina Toutanova"],
    venue: "NAACL, 2024",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["multimodal"],
    links: {
      paper: "https://aclanthology.org/2024.naacl-long.465/",
    },
    bib: String.raw`@inproceedings{zhu-etal-2024-efficient,
  title={Efficient End-to-End Visual Document Understanding with Rationale Distillation},
  author={Zhu, Wang and Agarwal, Alekh and Joshi, Mandar and Jia, Robin and Thomason, Jesse and Toutanova, Kristina},
  booktitle={North American Chapter of the Association for Computational Linguistics (NAACL)},
  year={2024},
  url={https://arxiv.org/abs/2311.09612}
}`,
    },

  // 2023 ----------------------------------------------------------------
  {
    id: "coq",
    year: 2023,
    title: "Chain-of-Questions Training with Latent Answers for Robust Multistep Question Answering",
    authors: [ME, "Jesse Thomason", "Robin Jia"],
    venue: "EMNLP, 2023",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["language"],
    links: {
      paper: "https://aclanthology.org/2023.emnlp-main.547/",
      code:  "https://github.com/Bill1235813/QDMR_COQ",
    },
    bib: String.raw`@inproceedings{zhu-etal-2023-chain,
  title={Chain-of-Questions Training with Latent Answers for Robust Multistep Question Answering},
  author={Zhu, Wang and Thomason, Jesse and Jia, Robin},
  booktitle={Empirical Methods in Natural Language Processing (EMNLP)},
  year={2023},
  url={https://arxiv.org/abs/2305.14901}
}`,
    },
  {
    id: "noisy-vln",
    year: 2023,
    title: "VLN Pretraining Still Works with Nonsensical or Irrelevant Instructions",
    authors: [ME, "Ishika Singh*", "Yuan Huang*", "Robin Jia", "Jesse Thomason"],
    venue: "O-DRUM @ CVPR, 2023",
    selected: true,
    project_types: ["eval"],
    domains: ["embodied"],
    links: {
      paper: "https://arxiv.org/abs/2311.17280",
    },
    bib: String.raw`@inproceedings{zhu-etal-2023-vln,
  title={{VLN} Pretraining Still Works with Nonsensical or Irrelevant Instructions},
  author={Zhu, Wang and Singh, Ishika and Huang, Yuan and Jia, Robin and Thomason, Jesse},
  booktitle={Open-Domain Reasoning Under Multi-Modal Settings @ CVPR (O-DRUM)},
  year={2023},
  url={https://arxiv.org/abs/2311.17280}
}`,
    },
  {
    id: "ivln",
    year: 2023,
    title: "Iterative Vision-and-Language Navigation",
    authors: ["Jacob Krantz*", "Shurjo Banerjee*", ME, "Jason Corso",
              "Peter Anderson", "Stefan Lee", "Jesse Thomason"],
    venue: "CVPR, 2023",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["embodied"],
    links: {
      paper: "https://arxiv.org/abs/2210.03087",
      code:  "https://github.com/Bill1235813/IVLN",
    },
    bib: String.raw`@inproceedings{krantz-etal-2023-iterative,
  title={Iterative Vision-and-Language Navigation},
  author={Krantz, Jacob and Banerjee, Shurjo and Zhu, Wang and Corso, Jason and Anderson, Peter and Lee, Stefan and Thomason, Jesse},
  booktitle={Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2023},
  url={https://arxiv.org/abs/2210.03087}
}`,
    },

  // 2022 ----------------------------------------------------------------
  {
    id: "gendiff",
    year: 2022,
    title: "Generalization Differences between End-to-End and Neuro-Symbolic Vision-Language Reasoning Systems",
    authors: [ME, "Jesse Thomason", "Robin Jia"],
    venue: "Findings of EMNLP, 2022",
    selected: true,
    project_types: ["eval"],
    domains: ["multimodal"],
    links: {
      paper: "https://aclanthology.org/2022.findings-emnlp.345/",
    },
    bib: String.raw`@inproceedings{zhu-etal-2022-generalization,
  title={Generalization Differences between End-to-End and Neuro-Symbolic Vision-Language Reasoning Systems},
  author={Zhu, Wang and Thomason, Jesse and Jia, Robin},
  booktitle={Findings of the Association for Computational Linguistics: EMNLP 2022},
  year={2022},
  url={https://arxiv.org/abs/2210.15037}
}`,
    },
  {
    id: "gps-cl",
    year: 2022,
    title: "Navigating Memory Construction by Global Pseudo-Task Simulation for Continual Learning",
    authors: ["Yejia Liu*", ME_EQ,
              "Shaolei Ren"],
    venue: "NeurIPS, 2022",
    selected: false,
    project_types: [],
    domains: [],
    links: {
      paper: "https://arxiv.org/abs/2210.08442",
    },
    bib: String.raw`@inproceedings{liu-etal-2022-navigating,
  title={Navigating Memory Construction by Global Pseudo-Task Simulation for Continual Learning},
  author={Liu, Yejia and Zhu, Wang and Ren, Shaolei},
  booktitle={Conference on Neural Information Processing Systems (NeurIPS)},
  year={2022},
  url={https://arxiv.org/abs/2210.08442}
}`,
    },

  // 2021 preprint -------------------------------------------------------
  {
    id: "compgen-transfer",
    year: 2021,
    title: "Learning to Generalize Compositionally by Transferring Across Semantic Parsing Tasks",
    authors: [ME, "Peter Shaw", "Tal Linzen", "Fei Sha"],
    venue: "Preprint, 2021",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["language"],
    links: {
      paper: "https://arxiv.org/abs/2111.05013",
    },
    bib: String.raw`@article{zhu-etal-2021-learning,
  title={Learning to Generalize Compositionally by Transferring Across Semantic Parsing Tasks},
  author={Zhu, Wang and Shaw, Peter and Linzen, Tal and Sha, Fei},
  journal={arXiv preprint arXiv:2111.05013},
  year={2021}
}`,
    },

  // 2020 ----------------------------------------------------------------
  {
    id: "babywalk",
    year: 2020,
    title: "BabyWalk: Going Farther in Vision-and-Language Navigation by Taking Baby Steps",
    authors: [ME_EQ, "Hexiang Hu*", "Jiacheng Chen",
              "Zhiwei Deng", "Vihan Jain", "Eugene Ie", "Fei Sha"],
    venue: "ACL, 2020",
    selected: true,
    project_types: ["verifiable-llm"],
    domains: ["embodied"],
    links: {
      paper: "https://arxiv.org/abs/2005.04625",
      code:  "https://github.com/Sha-Lab/babywalk",
    },
    bib: String.raw`@inproceedings{zhu-etal-2020-babywalk,
  title={{BabyWalk}: Going Farther in Vision-and-Language Navigation by Taking Baby Steps},
  author={Zhu, Wang and Hu, Hexiang and Chen, Jiacheng and Deng, Zhiwei and Jain, Vihan and Ie, Eugene and Sha, Fei},
  booktitle={Annual Conference of the Association for Computational Linguistics (ACL)},
  year={2020},
  url={https://arxiv.org/abs/2005.04625}
}`,
    },

  // 2018 ----------------------------------------------------------------
  {
    id: "lmut",
    year: 2018,
    title: "Toward Interpretable Deep Reinforcement Learning with Linear Model U-Trees",
    authors: ["Guiliang Liu", "Oliver Schulte", ME, "Qingcan Li"],
    venue: "ECML-PKDD, 2018",
    selected: false,
    project_types: [],
    domains: [],
    links: {
      paper: "https://arxiv.org/abs/1807.05887",
      code:  "https://github.com/Guiliang/DRL-ice-hockey",
    },
    bib: String.raw`@inproceedings{liu-etal-2018-toward,
  title={Toward Interpretable Deep Reinforcement Learning with Linear Model U-Trees},
  author={Liu, Guiliang and Schulte, Oliver and Zhu, Wang and Li, Qingcan},
  booktitle={European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases (ECML-PKDD)},
  year={2018},
  url={https://arxiv.org/abs/1807.05887}
}`,
    },
  {
    id: "sport-analytics",
    year: 2018,
    title: "Interpreting Deep Sports Analytics: Valuing Actions and Players in the NHL",
    authors: ["Guiliang Liu", ME, "Oliver Schulte"],
    venue: "MLSA @ ECML-PKDD, 2018",
    selected: false,
    project_types: [],
    domains: [],
    links: {
      paper: "https://dtai.cs.kuleuven.be/events/MLSA18/papers/liu_guiliang_mlsa18.pdf",
    },
    bib: String.raw`@inproceedings{liu-etal-2018-interpreting,
  title={Interpreting Deep Sports Analytics: Valuing Actions and Players in the {NHL}},
  author={Liu, Guiliang and Zhu, Wang and Schulte, Oliver},
  booktitle={MLSA Workshop @ ECML-PKDD},
  year={2018}
}`,
    },
];

// ---------- Rendering helpers ---------------------------------------------

function authorLink(a) {
  // The two ME sentinels render as the user with the underline-styled span.
  // Anything else is treated as a regular author name; if it matches a key
  // in AUTHOR_PAGES (with any trailing * stripped), it gets hyperlinked.
  if (a === ME)    return `<span class="me">Wang Bill Zhu</span>`;
  if (a === ME_EQ) return `<span class="me">Wang Bill Zhu*</span>`;

  const homepage = AUTHOR_PAGES[a.replace(/\*+$/, "")];
  return homepage
    ? `<a href="${homepage}" target="_blank" rel="noopener">${a}</a>`
    : a;
}

function linkRow(links) {
  // Render whichever link types are present, in a stable order. Returns a
  // sequence of <a> tags; pubItem stitches them next to the bib button so
  // they all share the same chip-styled action row.
  const order = [
    ["paper",    "paper"],
    ["site",     "website"],
    ["code",     "code"],
    ["data",     "data"],
  ];
  return order
    .filter(([key]) => links[key])
    .map(([key, label]) =>
      `<a class="pub-link" href="${links[key]}" target="_blank" rel="noopener">${label}</a>`
    )
    .join("");
}

function tagRow(pub, tagType) {
  // tagType is "project_types" | "domains". Renders little pills next
  // to the entry so the reader sees its categorization at a glance.
  if (!pub[tagType] || !pub[tagType].length) return "";
  const dictionary = tagType === "project_types" ? PROJECT_TYPES : DOMAINS;
  const tags = pub[tagType]
    .map(t => `<span class="pub-tag">${dictionary[t]}</span>`)
    .join("");
  return `<div class="pub-tags">${tags}</div>`;
}

function escapeHTML(s) {
  return s.replace(/[&<>]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]));
}

function pubItem(pub, opts = {}) {
  const authors = pub.authors.map(authorLink).join(", ");
  const bibBlock = pub.bib
    ? `<button class="bib-toggle" data-bib-id="${pub.id}" type="button">bib</button>
       <pre class="bib-block" id="bib-${pub.id}" hidden>${escapeHTML(pub.bib)}</pre>`
    : "";
  return `
    <li>
      <div class="pub-title">${pub.title}</div>
      <div class="pub-authors">${authors}</div>
      <div class="pub-venue">${pub.venue}${
        pub.award ? ` <span class="pub-award">${pub.award}</span>` : ""
      }</div>
      <div class="pub-actions">
        ${linkRow(pub.links)}
        ${bibBlock}
      </div>
      ${opts.showTag ? tagRow(pub, opts.showTag) : ""}
    </li>`;
}

function renderGroup(title, items, opts = {}) {
  if (!items.length) return "";
  const list = items.map(p => pubItem(p, opts)).join("");
  return `
    <div class="pub-group">
      <h3 class="pub-group-title">${title}</h3>
      <ul class="pub-list">${list}</ul>
    </div>`;
}

function renderFlatList(items, opts = {}) {
  if (!items.length) return `<p class="pub-empty">No papers in this category yet.</p>`;
  const list = items.map(p => pubItem(p, opts)).join("");
  return `<ul class="pub-list">${list}</ul>`;
}

// ---------- Sub-filter chips ---------------------------------------------
// Each taxonomy view (project-types, domains) renders a row of sub-tab
// chips: "All" + one per category. Selecting a chip filters in place.

function renderSubChips(viewId, dictionary, activeChip) {
  const chips = [
    `<button class="chip ${activeChip === "all" ? "active" : ""}"
             data-view="${viewId}" data-chip="all">All</button>`,
    ...Object.entries(dictionary).map(([id, label]) =>
      `<button class="chip ${activeChip === id ? "active" : ""}"
               data-view="${viewId}" data-chip="${id}">${label}</button>`
    ),
  ];
  return `<div class="chips">${chips.join("")}</div>`;
}

// ---------- Tab views -----------------------------------------------------
// Each view function takes a "chip" string ("all" or a category id) and
// returns the HTML for that view in that filter state.

function viewByProjectType(chip = "all") {
  const chips = renderSubChips("project-types", PROJECT_TYPES, chip);
  if (chip === "all") {
    const groups = Object.entries(PROJECT_TYPES).map(([id, label]) => {
      const items = publications
        .filter(p => p.selected && p.project_types.includes(id))
        .sort((a, b) => b.year - a.year);
      return renderGroup(label, items);
    });
    return chips + groups.join("");
  }
  const items = publications
    .filter(p => p.selected && p.project_types.includes(chip))
    .sort((a, b) => b.year - a.year);
  return chips + renderFlatList(items);
}

function viewByDomain(chip = "all") {
  const chips = renderSubChips("domains", DOMAINS, chip);
  if (chip === "all") {
    const groups = Object.entries(DOMAINS).map(([id, label]) => {
      const items = publications
        .filter(p => p.selected && p.domains.includes(id))
        .sort((a, b) => b.year - a.year);
      return renderGroup(label, items);
    });
    return chips + groups.join("");
  }
  const items = publications
    .filter(p => p.selected && p.domains.includes(chip))
    .sort((a, b) => b.year - a.year);
  return chips + renderFlatList(items);
}

function viewFullList() {
  // Plain chronological — preprints live in a separate section.
  const byYear = {};
  publications.forEach(p => {
    (byYear[p.year] = byYear[p.year] || []).push(p);
  });
  return Object.keys(byYear)
    .sort((a, b) => b - a)
    .map(year => renderGroup(year, byYear[year]))
    .join("");
}

const VIEWS = {
  "project-types": viewByProjectType,
  "domains":       viewByDomain,
  "full":          viewFullList,
};

// Track which chip is active per view, so switching tabs and coming back
// preserves the user's last filter selection within that tab.
const chipState = { "project-types": "all", "domains": "all" };

function activateTab(tabId) {
  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === tabId);
  });
  const fn = VIEWS[tabId];
  document.getElementById("pub-content").innerHTML = fn(chipState[tabId]);
}

document.addEventListener("DOMContentLoaded", () => {
  // Top-level tabs.
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => activateTab(btn.dataset.view));
  });

  // Delegated click handling inside the publications container:
  //   .chip       — sub-filter inside a taxonomy view
  //   .bib-toggle — show/hide the BibTeX block for one paper
  document.getElementById("pub-content").addEventListener("click", e => {
    const bibBtn = e.target.closest(".bib-toggle");
    if (bibBtn) {
      const target = document.getElementById(`bib-${bibBtn.dataset.bibId}`);
      if (target) target.hidden = !target.hidden;
      bibBtn.classList.toggle("active", target && !target.hidden);
      return;
    }
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const view = chip.dataset.view;
    chipState[view] = chip.dataset.chip;
    activateTab(view);
  });

  activateTab("project-types");                 // default view
});
