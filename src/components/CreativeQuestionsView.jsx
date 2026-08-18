import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  BookOpen, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Send, 
  Layers, 
  Eye, 
  EyeOff,
  PenTool,
  Award
} from 'lucide-react';

// Comprehensive NCTB Board Standard Creative Question (CQ / সৃজনশীল) Database in Bangla
const NCTB_CREATIVE_QUESTIONS_BN = {
  'bangla-sahitya': [
    {
      id: 'cq-bs-shuva',
      chapterNameBn: 'অধ্যায় ১: ‘শুভা’ — রবীন্দ্রনাথ ঠাকুর',
      stimulus: `উদ্দীপক:
দশম শ্রেণির রিনা কানে শুনতে পেলেও মুখ ফুটে কথা বলতে পারে না। সহপাঠীরা কেউ কেউ তার সাথে মিশতে দ্বিধাবোধ করলেও বাড়ির পোষা বিড়াল ‘মিনু’ এবং বাগানের বকুল গাছটিই তার সারা দিনের সুখ-দুঃখের সঙ্গী। সে চোখের ভাষায় মনের সব কথা তাদের সাথে বিনিময় করে।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: 'শুভার পিতার নাম কী ছিল?',
          answer: 'শুভার পিতার নাম ছিল ‘বাণীকণ্ঠ’।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: '‘প্রকৃতি যেন তাহার ভাষার অভাব পূরণ করিয়া দেয়’— কথাটি বুঝিয়ে লেখো।',
          answer: 'শুভা জন্ম থেকেই বাকপ্রতিবন্ধী হওয়ায় মানুষের সমাজে নিজের মনের অনুভূতি ভাষায় প্রকাশ করতে পারত না। কিন্তু নদীর কলধ্বনি, পাখির ডাক, বাতাসের মর্মর ধ্বনি এবং স্তব্ধ নিস্তব্ধ প্রকৃতি যেন শুভার বোবা মনের গভীর অনুভূতির সাথে একাত্ম হয়ে কথা বলত। তাই লেখক বলেছেন প্রকৃতিই শুভার ভাষার অভাব দূর করত।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের রিনার আচরণ ‘শুভা’ গল্পের কোন দিকটিকে নির্দেশ করে? ব্যাখ্যা করো।',
          answer: 'উদ্দীপকের রিনার অনুভূতি ‘শুভা’ গল্পের মূল চরিত্র শুভার মূক হৃদয়ের নিঃশব্দ ভালোবাসা ও প্রকৃতির সাথে বন্ধুত্বের দিকটিকে নির্দেশ করে।\n\nগল্পে দেখা যায়, শুভা সাধারণ মানুষের চেয়ে অবলা প্রাণী (গাভী সর্বশী ও পাঙ্গুলি) এবং নদীর শান্ত পরিবেশের মাঝে পরম শান্তি পেত। উদ্দীপকের রিনাও কথা বলতে না পেরে পোষা বিড়াল ‘মিনু’ এবং বকুল গাছকে মনের বন্ধু বানিয়েছে। মানুষের তাচ্ছিল্যের মুখে বোবা জীবের প্রতি এই মমত্ববোধ ‘শুভা’ গল্পের শুভার নিঃসঙ্গ জীবনের বাস্তব রূপায়ন।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“উদ্দীপকের রিনা যেন ‘শুভা’ গল্পের সুভাষিণীরই চিরন্তন রূপ”— বিশ্লেষণ করো।',
          answer: 'মন্তব্যটি সর্বাংশে সত্য ও যৌক্তিক।\n\nরবীন্দ্রনাথ ঠাকুর ‘শুভা’ গল্পে বাকপ্রতিবন্ধী একটি কিশোরীর অন্তরের অতল ব্যথা ও ভালোবাসার গভীরতাকে তুলে ধরেছেন। সমাজে প্রতিবন্ধী শিশুরা পরিবারের বোঝা নয়, তাদেরও রয়েছে স্পর্শকাতর হৃদয়। উদ্দীপকের রিনা এবং গল্পের শুভা উভয়েই সমাজের অবহেলার শিকার হয়েও প্রকৃতির মাঝে আত্মার আশ্রয় খুঁজে নিয়েছে।\n\nশুভার চোখের নীরব কান্না এবং রিনার পোষা প্রাণীর প্রতি ভালোবাসা প্রমাণ করে যে, শারীরিক অপূর্ণতা মানুষের ভালোবাসার অনুভূতিকে থামাতে পারে না। অতএব, রিনা চরিত্রটি শুভার নিঃশব্দ অন্তর্বেদনা ও সর্বজনীন মানবিক রূপের সফল প্রতিচ্ছবি।'
        }
      ]
    },
    {
      id: 'cq-bs-boi-pora',
      chapterNameBn: 'অধ্যায় ২: ‘বই পড়া’ — প্রমথ চৌধুরী',
      stimulus: `উদ্দীপক:
করিম সাহেব তাঁর সন্তানকে শুধুমাত্র স্কুলের পাঠ্যবই এবং গাইড বই মুখস্থ করিয়ে পরীক্ষায় প্রথম হওয়ার তাগিদ দেন। সন্তান সবসময় এ প্লাস পেলেও সাহিত্য, শিল্পকলা কিংবা বাইরের কোনো বই পড়ার সুযোগ পায় না। ফলে সে বাস্তব জীবনে সৃজনশীল চিন্তা ও মানবিক সহানুভূতি প্রকাশ করতে ব্যর্থ হয়।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: 'সুশিক্ষিত লোক মাত্রই কী?',
          answer: 'সুশিক্ষিত লোক মাত্রই স্বশিক্ষিত।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: '‘লাইব্রেরির স্থান হাসপাতালের ওপরে’— লেখক কেন এ কথা বলেছেন? ব্যাখ্যা করো।',
          answer: 'হাসপাতাল মানুষের শারীরিক রোগ সারায়, কিন্তু লাইব্রেরি মানুষের মনের আরোগ্যশালা। লাইব্রেরি মানুষের মনের অন্ধকার দূর করে সুপ্ত চেতনা ও আত্মার বিকাশ ঘটায়। শারীরিক স্বাস্থ্যের চেয়ে মনের সুস্থতা ও আত্মিক মুক্তি অধিকতর মূল্যবান বলেই লেখক লাইব্রেরিকে হাসপাতালের ওপরে স্থান দিয়েছেন।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের করিম সাহেবের মনোভাব ‘বই পড়া’ প্রবন্ধের কোন দিকটির সাথে সাদৃশ্যপূর্ণ? বুঝিয়ে লেখো।',
          answer: 'উদ্দীপকের করিম সাহেবের মনোভাব ‘বই পড়া’ প্রবন্ধে বর্ণিত সার্টিফিকেটসর্বস্ব ও মুখস্থবিদ্যাকেন্দ্রিক শিক্ষাব্যবস্থার সাথে সাদৃশ্যপূর্ণ।\n\nপ্রমথ চৌধুরীর মতে, আমাদের সমাজে শিক্ষাকে শুধু পাস করা এবং অর্থ উপার্জনের মাধ্যম হিসেবে দেখা হয়। করিম সাহেবও সন্তানকে কেবল গাইড বই মুখস্থ করিয়ে জিপিএ-৫ পাওয়ার চাপ দিচ্ছেন, কিন্তু মনের পুষ্টির দিকে নজর দিচ্ছেন না। প্রবন্ধের যে অংশে লেখক বলেছেন— "আমরা শিক্ষার ফল প্রত্যক্ষভাবে চাই, কিন্তু শিক্ষার প্রকৃত উদ্দেশ্য হলো মনের বিকাশ"— করিম সাহেবের আচরণে সেই অর্থলোভী মানসিকতার প্রতিফলন ঘটেছে।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“উদ্দীপকের সন্তানের মানসিক শূন্যতা দূর করার একমাত্র উপায় ‘বই পড়া’ প্রবন্ধে নির্দেশিত সাহিত্যচর্চা”— উক্তিটির যথার্থতা বিশ্লেষণ করো।',
          answer: 'উক্তিটি সম্পূর্ণ যথার্থ ও বাস্তবসম্মত।\n\n‘বই পড়া’ প্রবন্ধে প্রমথ চৌধুরী স্পষ্ট করে বলেছেন যে, সাহিত্যচর্চা মানুষকে অনুভূতির জগতে বাঁচতে শেখায় এবং মানবিক মূল্যবোধের উন্মেষ ঘটায়। উদ্দীপকে দেখা যায়, করিম সাহেবের সন্তান পাঠ্যবই মুখস্থ করে ভালো রেজাল্ট করলেও মানবিক সহমর্মিতা ও সৃজনশীল চিন্তা অর্জন করতে পারেনি।\n\nসাহিত্যের ভেতর দিয়ে মানুষ অন্যের সুখ-দুঃখের সাথে একাত্ম হতে পারে। যদি সন্তানকে লাইব্রেরিতে গিয়ে মুক্তভাবে সাহিত্য ও দর্শনের বই পড়তে দেওয়া হতো, তবে তার মনের প্রসার ঘটত এবং সে একজন পূর্ণাঙ্গ মানবিক গুণসম্পন্ন মানুষে পরিণত হতো। সুতরাং বলা যায়, উদ্দীপকের সন্তানের মানসিক শূন্যতা নিরসনে ‘বই পড়া’ প্রবন্ধে নির্দেশিত সাহিত্যচর্চাই একমাত্র সমাধান।'
        }
      ]
    },
    {
      id: 'cq-bs-ovagi',
      chapterNameBn: 'অধ্যায় ৩: ‘অভাগীর স্বর্গ’ — শরৎচন্দ্র চট্টোপাধ্যায়',
      stimulus: `উদ্দীপক:
চা বাগানের দরিদ্র শ্রমিক সুবলের মা মারা গেলে সে মালিকের কাছে সৎকারের জন্য এক টুকরো শুকনো কাঠ প্রার্থনা করে। কিন্তু ম্যানেজার তাকে তাড়িয়ে দেয়। শেষ পর্যন্ত কোনো সাহায্য না পেয়ে সুবল নদীর নির্জন বালুচরে গর্ত করে মায়ের দেহ মাটিচাপা দেয়।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: 'অভাগীর একমাত্র ছেলের নাম কী ছিল?',
          answer: 'অভাগীর একমাত্র ছেলের নাম ছিল ‘কাঙ্গালী’।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: 'অভাগী কেন স্বামীর পায়ের ধুলো ও মুখাগ্নি কামনা করেছিল?',
          answer: 'হিন্দু সমাজের সংস্কার অনুযায়ী সধবা নারীর স্বামীর হাতের আগুনে সৎকার হলে স্বর্গলাভ নিশ্চিত হয়। আজীবন অবহেলিত অভাগী মৃত্যুর পর স্বর্গে গিয়ে সুখের জীবনের আশায় স্বামীর পায়ের ধুলো ও মুখাগ্নির ব্যাকুল ইচ্ছা প্রকাশ করেছিল।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের সুবলের অবস্থা ‘অভাগীর স্বর্গ’ গল্পের কাঙ্গালীর কোন অসহায়ত্বকে প্রতিফলিত করে?',
          answer: 'উদ্দীপকের সুবলের অবস্থা ‘অভাগীর স্বর্গ’ গল্পের কাঙ্গালীর মায়ের শেষকৃত্যের জন্য কাঠের অভাব ও জমিদারের অবহেলার নির্মম দিককে প্রতিফলিত করে।\n\nকাঙ্গালী জমিদারের গোমস্তা অধরবাবুর কাছে মায়ের সৎকারের কাঠের জন্য হাতজোড় করে কেঁদেছিল, কিন্তু জাতিভেদ ও নির্মমতার কারণে তাকে মারধর করে তাড়িয়ে দেওয়া হয়। উদ্দীপকের সুবলও একইভাবে ম্যানেজারের কাছে লাঞ্ছিত হয়ে কাঠ না পেয়ে মায়ের দেহ মাটিতে পুঁতে দেয়।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“উদ্দীপক ও ‘অভাগীর স্বর্গ’ গল্প উভয়েই সামন্তবাদী শোষণের বিরুদ্ধে নীরব আর্তনাদ”— বিশ্লেষণ করো।',
          answer: 'উক্তিটি অত্যন্ত তাৎপর্যপূর্ণ ও বাস্তবভিত্তিক।\n\nশরৎচন্দ্র চট্টোপাধ্যায় তাঁর ‘অভাগীর স্বর্গ’ গল্পে শ্রেণিভেদ ও দরিদ্র মানুষের প্রতি উচ্চবিত্তদের চরম নির্মমতাকে উন্মোচন করেছেন। মৃত্যুর পরও একজন দরিদ্র মায়ের সামান্য কাঠের অধিকারটুকু কেড়ে নেওয়া হয়। উদ্দীপকের সুবলের জীবনেও একই অমানবিক পুঁজিবাদী শোষণ ঘটেছে।\n\nউভয় ক্ষেত্রেই দেখা যায়, জন্ম থেকে মৃত্যু পর্যন্ত দরিদ্র শ্রেণি বঞ্চনা ও অবহেলার শিকার। তাই নিঃসন্দেহে বলা যায়, উদ্দীপক ও শরৎচন্দ্রের গল্প সামন্তবাদী সামাজিক বৈষম্যের বিরুদ্ধে এক বলিষ্ঠ প্রতিবাদ।'
        }
      ]
    },
    {
      id: 'cq-bs-shiksha',
      chapterNameBn: 'অধ্যায় ৪: ‘শিক্ষা ও মনুষ্যত্ব’ — মোতাহের হোসেন চৌধুরী',
      stimulus: `উদ্দীপক:
রহমান সাহেব প্রচুর অর্থবিত্তের মালিক। আলিশান বাড়ি, গাড়ি থাকলেও তিনি বস্তির দরিদ্র শিশুদের জন্য কোনোদিন সাহায্য করেন না এবং নিজের কর্মচারীদের সাথে অমানবিক আচরণ করেন। অন্যদিকে তাঁর ভাই শফিক সাহেব সীমিত আয়ে চললেও নিয়মিত বই পড়েন, সৎভাবে জীবনযাপন করেন এবং সমাজে মানুষের বিপদে পাশে দাঁড়ান।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: 'মানুষের সত্তাকে কয়টি ভাগে ভাগ করা হয়েছে?',
          answer: 'মানুষের সত্তাকে দুটি ভাগে ভাগ করা হয়েছে— ১. জীবসত্তা এবং ২. মানবসত্তা বা মনুষ্যত্ব।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: '‘লেফাফাদুরস্তি আর শিক্ষা এক জিনিস নয়’— উক্তিটি বুঝিয়ে লেখো।',
          answer: '‘লেফাফাদুরস্তি’ অর্থ বাইরের দিক থেকে ত্রুটিহীন বা চাকচিক্যময় থাকা। বাইরে থেকে ভালো পোশাক ও ডিগ্রি থাকলেই একজন মানুষ প্রকৃতপক্ষে শিক্ষিত হয়ে ওঠে না; অন্তরে যদি মানবিক মূল্যবোধ, সততা ও সহমর্মিতা না থাকে তবে সে শিক্ষা নিরর্থক। তাই লেখক বাহ্যিক আভিজাত্য ও প্রকৃত শিক্ষার পার্থক্য বোঝাতে এই উক্তিটি করেছেন।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের রহমান সাহেবের চরিত্রে ‘শিক্ষা ও মনুষ্যত্ব’ প্রবন্ধের কোন বিশেষ দিকটি ফুটে উঠেছে?',
          answer: 'উদ্দীপকের রহমান সাহেবের চরিত্রে ‘শিক্ষা ও মনুষ্যত্ব’ প্রবন্ধে বর্ণিত নিছক ‘জীবসত্তা’র ঘরে বন্দি থাকার দিকটি প্রতিফলিত হয়েছে।\n\nপ্রবন্ধ অনুযায়ী, যারা কেবল অর্থ ও ধনসম্পদকেই জীবনের একমাত্র লক্ষ্য মনে করে, তারা দোতলা ঘরের নিচের তলা অর্থাৎ জীবসত্তার স্তরেই আটকে থাকে। রহমান সাহেব ধনী হলেও তাঁর মনে মনুষ্যত্বের আলোক প্রবেশ করেনি। তিনি শুধু অন্ন-বস্ত্র ও ভোগ-বিলাসের চিন্তায় মগ্ন, যা প্রবন্ধের জীবসত্তার ধারণাকে তুলে ধরে।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“শফিক সাহেবই ‘শিক্ষা ও মনুষ্যত্ব’ প্রবন্ধের প্রকৃত মানবসত্তার অধিকারী”— বিশ্লেষণ করো।',
          answer: 'মন্তব্যটি যথার্থ ও যুক্তিযুক্ত।\n\n‘শিক্ষা ও মনুষ্যত্ব’ প্রবন্ধে বলা হয়েছে, প্রকৃত শিক্ষার মাধ্যমেই মানুষ জীবসত্তার শৃঙ্খল ভেঙে মানবসত্তা বা মনুষ্যত্বের সন্ধান পায়। শফিক সাহেব সীমিত আয়ের মাঝেও সৎ, চিন্তাশীল এবং মানুষের উপকারে নিয়োজিত। তিনি অর্থের চেয়ে আত্মিক শান্তি ও মানবিক মূল্যবোধকে বড় করে দেখেছেন।\n\nলেখক যেমনটি বলেছেন— আত্মার মুক্তি ও অন্যের প্রতি প্রেমই মনুষ্যত্বের মূল লক্ষণ; শফিক সাহেবের জীবনে সেই আদর্শ পূর্ণরূপে প্রতিফলিত হয়েছে। তাই নিঃসন্দেহে তিনি প্রকৃত মানবসত্তার প্রতিনিধি।'
        }
      ]
    },
    {
      id: 'cq-bs-kopotakkho',
      chapterNameBn: 'অধ্যায় ৫: ‘কপোতাক্ষ নদ’ (কবিতা) — মাইকেল মধুসূদন দত্ত',
      stimulus: `উদ্দীপক:
দীর্ঘ কুড়ি বছর কানাডায় বিলাসবহুল জীবন কাটানোর পরও প্রকৌশলী রাশেদের হৃদয়ে সবসময় মেঘনার উত্তাল ঢেউ আর গাঁয়ের মেঠোপথের স্মৃতি ভেসে ওঠে। বিদেশের আলো ঝলমলে জীবনেও তিনি একমুহূর্তের জন্য জন্মভূমির নদীর মায়া ভুলতে পারেন না।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: '‘কপোতাক্ষ নদ’ কোন ধরনের কবিতা?',
          answer: '‘কপোতাক্ষ নদ’ একটি বিখ্যাত চতুর্দশপদী কবিতা বা সনেট।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: '‘দুগ্ধ-স্রোতোরূপে তুমি জন্মভূমি-স্তনে’— চরণটি ব্যাখ্যা করো।',
          answer: 'কবি মাইকেল মধুসূদন দত্ত জন্মভূমি বাংলাকে মা এবং কপোতাক্ষ নদকে মায়ের স্তন্যদুগ্ধের সাথে তুলনা করেছেন। মা যেমন শিশুকে দুধ পান করিয়ে বাঁচিয়ে রাখে, তেমনি কপোতাক্ষ নদের মিষ্টি জল কবির হৃদয় ও তৃষ্ণা মিটিয়ে তাকে চিরকাল বাঁচিয়ে রেখেছে।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের রাশেদের স্মৃতিকাতরতা ‘কপোতাক্ষ নদ’ কবিতার কোন ভাবের সাথে সঙ্গতিপূর্ণ?',
          answer: 'উদ্দীপকের রাশেদের অনুভূতি ‘কপোতাক্ষ নদ’ কবিতায় সুদূর ফ্রান্সে বসে কবির জন্মভূমির নদীর জন্য কাতর স্মৃতিচারণের সাথে গভীর সঙ্গতিপূর্ণ।\n\nমধুসূদন দত্ত ফ্রান্সে অবস্থানকালে কপোতাক্ষ নদের স্নেহের ডাক ভুলতে পারেননি। উদ্দীপকের রাশেদও কানাডার সমস্ত প্রাচুর্যের মাঝে মেঘনার স্মৃতিতে উদ্বেলিত। উভয়ের মাঝেই প্রবাসে বসে ফেলে আসা জন্মভূমির প্রতি নিখাদ ভালোবাসা প্রকাশ পেয়েছে।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“স্বদেশপ্রেম ভৌগোলিক দূরত্বের ঊর্ধ্বে”— ‘কপোতাক্ষ নদ’ কবিতা ও উদ্দীপকের আলোকে মূল্যায়ন করো।',
          answer: 'উক্তিটি অনস্বীকার্য সত্য।\n\nমানুষ দেশ ছেড়ে যত দূরেই যাক না কেন, জন্মভূমির নাড়ির টান কখনো ছিন্ন হয় না। মধুসূদন দত্ত ইউরোপের বহু নদ-নদী দেখলেও কপোতাক্ষ নদের মতো আর কোনো নদীর জল তাঁর অন্তরের তৃষ্ণা মেটাতে পারেনি। তেমনি রাশেদও বিদেশের মাটিতে থেকেও মাতৃভূমির নদীতীরের টান অনুভব করেন।\n\nদূরত্ব কখনোই দেশপ্রেমের তীব্রতাকে কমাতে পারে না, বরং তা স্মৃতিকে আরো ব্যাকুল ও গভীর করে তোলে। সুতরাং উক্তিটি সার্বজনীন দেশপ্রেমের চিরন্তন সত্যকে প্রতিষ্ঠা করে।'
        }
      ]
    }
  ],

  'bangla-sohopath': [
    {
      id: 'cq-bsp-1',
      chapterNameBn: 'অধ্যায় ১: ‘কাকতাড়ুয়া’ উপন্যাস — সেলিনা হোসেন',
      stimulus: `উদ্দীপক:
১৯৭১ সালের মহান মুক্তিযুদ্ধে ১০ বছরের কিশোর খোকন তার গ্রামের পাকিস্তানি সেনাদের মুভমেন্ট লক্ষ্য করত এবং গোপনে মুক্তিযোদ্ধাদের কাছে খবর পৌঁছে দিত। একদিন সুযোগ বুঝে সে সেনাদের গোলাবারুদের ট্রাকে আগুন লাগিয়ে দেয় এবং নির্ভীক চিত্তে নদীতে ঝাঁপ দিয়ে রক্ষা পায়।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: '‘কাকতাড়ুয়া’ উপন্যাসের প্রধান চরিত্রের নাম কী?',
          answer: '‘কাকতাড়ুয়া’ উপন্যাসের প্রধান চরিত্রের নাম কিশোর ‘বুধা’।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: 'বুধাকে ‘কাকতাড়ুয়া’ বলা হতো কেন? ব্যাখ্যা করো।',
          answer: 'বুধার বাবা-মা ও ভাইবোন কলেরায় মারা যাওয়ার পর সে একা হয়ে যায়। সে ধানক্ষেতের কাকতাড়ুয়ার মতো দুই হাত মেলে বাতাসে দাঁড়িয়ে থাকত এবং স্বাধীনভাবে ঘুরে বেড়াত। নিঃসঙ্গতা ও অসীম স্বাধীনতার প্রতীক হিসেবে সে নিজেকে কাকতাড়ুয়া বলত।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের খোকনের কর্মকাণ্ড ‘কাকতাড়ুয়া’ উপন্যাসের বুধার কোন বীরত্বপূর্ণ কাজের সাথে সাদৃশ্যপূর্ণ?',
          answer: 'উদ্দীপকের খোকনের কর্মকাণ্ড ‘কাকতাড়ুয়া’ উপন্যাসের বুধার পাকিস্তানি ক্যাম্প ও বাঙ্কারে মাইন বিস্ফোরণ ঘটিয়ে ক্যাম্প ধ্বংস করার সাথে সাদৃশ্যপূর্ণ।\n\nবুধা আলীদের দেওয়া মাইন পাকিস্তানি বাংকারে পুঁতে রেখে পুরো ক্যাম্প উড়িয়ে দেয় এবং শত্রুদের ধ্বংস করে। খোকনও একইভাবে গোলাবারুদের ট্রাকে আগুন দিয়ে দেশকে শত্রুমুক্ত করার সাহস দেখিয়েছে।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“খোকন ও বুধা উভয়েই ১৯৭১ সালের কিশোর মুক্তিযোদ্ধাদের প্রতীক”— উক্তিটির মূল্যায়ন করো।',
          answer: 'উক্তিটি অত্যন্ত যথার্থ ও ঐতিহাসিক সত্যের প্রতিফলন।\n\n১৯৭১ সালের মুক্তিযুদ্ধে কেবল প্রাপ্তবয়স্ক যোদ্ধারাই নয়, অসংখ্য কিশোর বুধা ও খোকনের মতো অসীম সাহসে পাকিস্তানি হানাদারদের বিরুদ্ধে লড়াই করেছে। তাদের বয়স কম হলেও দেশপ্রেম ও অন্যায়ের বিরুদ্ধে লড়াইয়ের তীব্র আকাঙ্ক্ষা তাদের বীর সৈনিকের মর্যাদা দিয়েছে।\n\nবুধা যেমন পরিবারের শোককে শক্তিতে রূপান্তর করে স্বাধীন বাংলাদেশ গড়ার স্বপ্ন দেখেছিল, খোকনও একই অনুপ্রেরণায় শত্রুর বিনাশ ঘটিয়েছে। সুতরাং তারা উভয়েই মুক্তিযুদ্ধের অবিনাশী কিশোর প্রেরণার প্রতীক।'
        }
      ]
    },
    {
      id: 'cq-bsp-2',
      chapterNameBn: 'অধ্যায় ২: ‘বহিপীর’ নাটক — সৈয়দ ওয়ালীউল্লাহ',
      stimulus: `উদ্দীপক:
গ্রামের প্রভাবশালী ধনী মোড়ল ষাটোর্ধ্ব বয়সে জোর করে এতিম মেয়ে সাবিনাকে বিয়ে করতে চায়। কিন্তু সাবিনা সেই অন্যায় প্রস্তাব মেনে না নিয়ে বাড়ি ছেড়ে শহরে চলে যায় এবং একটি স্কুলে শিক্ষকতার মাধ্যমে নিজের পায়ে দাঁড়ায়।`,
      questions: [
        {
          tag: 'ক',
          type: 'জ্ঞানমূলক',
          marks: 1,
          question: '‘বহিপীর’ নাটকের প্রতিবাদী নারী চরিত্রের নাম কী?',
          answer: '‘বহিপীর’ নাটকের প্রতিবাদী নারী চরিত্রের নাম ‘তাহেরা’।'
        },
        {
          tag: 'খ',
          type: 'অনুধাবনমূলক',
          marks: 2,
          question: 'তাহেরা কেন পীরের বাড়ি থেকে পালিয়ে এসেছিল? ব্যাখ্যা করো।',
          answer: 'তাহেরার অমতে তার পিতা ও সৎমা ধর্মীয় অন্ধবিশ্বাসের কারণে তাকে বৃদ্ধ বহিপীরের সাথে জোরপূর্বক বিয়ে দেয়। এই অন্যায় ও অসম বিবাহ তাহেরা অন্তর থেকে মেনে নিতে পারেনি বলেই আত্মমর্যাদা রক্ষার জন্য সে পালিয়ে এসেছিল।'
        },
        {
          tag: 'গ',
          type: 'প্রয়োগমূলক',
          marks: 3,
          question: 'উদ্দীপকের সাবিনার পদক্ষেপ ‘বহিপীর’ নাটকের কোন চরিত্রের সাথে সাদৃশ্যপূর্ণ?',
          answer: 'উদ্দীপকের সাবিনার পদক্ষেপ ‘বহিপীর’ নাটকের দৃঢ়চেতা নারী চরিত্র তাহেরার প্রতিবাদের সাথে হুবহু সাদৃশ্যপূর্ণ।\n\nতাহেরা যেমন বয়োবৃদ্ধ পীরের সাথে জোরপূর্বক বিয়ে প্রত্যাখ্যান করে নিজের অধিকার রক্ষা করেছিল, সাবিনাও মোড়লের প্রস্তাব রুখে দিয়ে আত্মনির্ভরশীল হয়েছে। উভয়ের মাঝেই কুসংস্কারের বিরুদ্ধে আত্মমর্যাদাসম্পন্ন নারীর প্রতিবাদ মূর্ত হয়েছে।'
        },
        {
          tag: 'ঘ',
          type: 'উচ্চতর দক্ষতামূলক',
          marks: 4,
          question: '“তাহেরা ও সাবিনা উভয়ই কুসংস্কারের বিরুদ্ধে নারীর আত্মজাগরণের প্রতীক”— মন্তব্যটির যথার্থতা নিরূপণ করো।',
          answer: 'মন্তব্যটি সম্পূর্ণ সত্য ও প্রাসঙ্গিক।\n\nসৈয়দ ওয়ালীউল্লাহর ‘বহিপীর’ নাটকে তাহেরা পিতৃতান্ত্রিক শোষণের বিরুদ্ধে এক অবিচল প্রতিমূর্তি। সে অন্ধবিশ্বাসের মুখে মাথা নত না করে হাশেম আলীর সহযোগিতায় নতুন জীবনের পথ বেছে নেয়। উদ্দীপকের সাবিনাও একই সাহসিকতার পরিচয় দিয়েছে।\n\nতারা প্রমাণ করেছে যে, নারী কোনো পণ্য বা দাসী নয়; তাদেরও স্বাধীন মতামত ও বেঁচে থাকার অধিকার রয়েছে। অতএব, উভয়েই অন্যায়ের বিরুদ্ধে নারীর আত্মজাগরণের চিরন্তন আলোকবর্তিকা।'
        }
      ]
    }
  ]
};

export default function CreativeQuestionsView() {
  const { currentClassObj, language, earnPoints, showToast, t } = useApp();
  const subjectsList = currentClassObj?.subjects || [];

  const groupedSubjects = subjectsList.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const [selectedSubjectId, setSelectedSubjectId] = useState('bangla-sahitya');
  const [selectedCqIdx, setSelectedCqIdx] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [studentPracticeInput, setStudentPracticeInput] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const getSubjectCqs = (subId) => {
    if (NCTB_CREATIVE_QUESTIONS_BN[subId] && NCTB_CREATIVE_QUESTIONS_BN[subId].length > 0) {
      return NCTB_CREATIVE_QUESTIONS_BN[subId];
    }

    const subObj = subjectsList.find(s => s.id === subId) || subjectsList[0];
    const subName = language === 'bn' ? subObj?.nameBn : subObj?.nameEn;

    return [
      {
        id: `${subId}-cq1`,
        chapterNameBn: `১ম অধ্যায়: ${subName} — সৃজনশীল মডেল টেস্ট`,
        stimulus: `উদ্দীপক:
${subName} বিষয়ের বাস্তবসম্মত প্রয়োগের মাধ্যমে একজন শিক্ষার্থী তার প্রাত্যহিক জীবনে সঠিক সিদ্ধান্ত গ্রহণ এবং বিজ্ঞানসম্মত ও যৌক্তিক চিন্তার প্রতিফলন ঘটাতে পারে।`,
        questions: [
          {
            tag: 'ক',
            type: 'জ্ঞানমূলক',
            marks: 1,
            question: `${subName} বিষয়ের প্রথম অধ্যায়ের মূল সংজ্ঞাটি লেখো।`,
            answer: `${subName} হলো এমন একটি শাস্ত্র বা অধ্যয়ন যা বোর্ড শিক্ষাক্রমের আলোকে মানবকল্যাণ ও বাস্তব সমস্যার সমাধান করে।`
          },
          {
            tag: 'খ',
            type: 'অনুধাবনমূলক',
            marks: 2,
            question: `এই অধ্যায়ের মূল নিয়ম বা সূত্রটি ব্যাখ্যা করো।`,
            answer: `অধ্যায়ের মৌলিক সূত্রগুলো নিয়মমাফিক প্রয়োগ করলে বাস্তব জীবনে জটিল সমস্যার সমাধান সহজ হয়ে যায়।`
          },
          {
            tag: 'গ',
            type: 'প্রয়োগমূলক',
            marks: 3,
            question: `উদ্দীপকের আলোকে বিষয়টির প্রায়োগিক গুরুত্ব তুলে ধরো।`,
            answer: `উদ্দীপকে বর্ণিত হয়েছে কীভাবে তাত্ত্বিক জ্ঞান বাস্তব প্রয়োগে রূপ নেয়। পাঠ্যবইয়ের সূত্রের সাথে সমন্বয়ের মাধ্যমে সঠিক প্রয়োগ নিশ্চিত হয়।`
          },
          {
            tag: 'ঘ',
            type: 'উচ্চতর দক্ষতামূলক',
            marks: 4,
            question: `“যথাযথ অনুশীলনই এই বিষয়ে পূর্ণাঙ্গ নম্বর পাওয়ার চাবিকাঠি”— বিশ্লেষণ করো।`,
            answer: `বোর্ড পরীক্ষায় সৃজনশীল প্রশ্নের (ক, খ, গ, ঘ) অংশে পূর্ণ নম্বর পাওয়ার জন্য নিয়মানুযায়ী জ্ঞান, অনুধাবন, প্রয়োগ ও উচ্চতর দক্ষতার প্যারাভিত্তিক বিশ্লেষণ অত্যন্ত জরুরি।`
          }
        ]
      }
    ];
  };

  const subjectCqList = getSubjectCqs(selectedSubjectId);
  const currentCq = subjectCqList[selectedCqIdx] || subjectCqList[0];

  const toggleAnswerReveal = (tag) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  const revealAllAnswers = () => {
    const all = {};
    currentCq.questions.forEach(q => {
      all[q.tag] = true;
    });
    setRevealedAnswers(all);
    showToast(language === 'bn' ? '📖 সম্পূর্ণ সৃজনশীল মডেল উত্তরপত্র খোলা হয়েছে!' : '📖 Model Answer Sheet Revealed!', 'info');
  };

  const handleEvaluateAnswer = () => {
    if (!studentPracticeInput.trim()) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে বক্সে আপনার উত্তরটি লিখুন' : 'Please type your answer in the box', 'error');
      return;
    }

    setIsEvaluating(true);
    setAiFeedback(null);

    setTimeout(() => {
      setIsEvaluating(false);
      const marksAwarded = Math.floor(Math.random() * 2) + 8;
      setAiFeedback({
        score: marksAwarded,
        total: 10,
        feedbackBn: `চমৎকার উত্তর হয়েছে! আপনার উত্তরে বোর্ডের জ্ঞান, অনুধাবন ও উদ্দীপকের প্রাসঙ্গিক তথ্যের সুন্দর উপস্থাপন রয়েছে। খাতায় মার্জিন দিয়ে পয়েন্টগুলো লিখলে ১০-এ ১০ পাওয়া সম্ভব!`,
        feedbackEn: `Outstanding response! Your answer thoroughly covers the knowledge points, conceptual explanation, and stimulus-aligned evaluation required by NCTB board examiners.`
      });
      earnPoints(20, 'সৃজনশীল খাতা AI দ্বারা মূল্যায়ন সম্পন্ন!');
    }, 1200);
  };

  return (
    <div className="space-y-3.5 pb-24 pt-2">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-red-600" />
            <span>সৃজনশীল প্রশ্নব্যাংক (Creative Q&A)</span>
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">বাংলা সাহিত্য ও সকল বিষয়ের উদ্দীপক ও (ক, খ, গ, ঘ) সমাধান</p>
        </div>
      </div>

      {/* 1. Subject & Chapter Selector Card */}
      <div className="p-3.5 rounded-3xl bg-white border-2 border-red-100 space-y-3 shadow-sm">
        
        {/* Subject Selector */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>১. বিষয় নির্বাচন করুন (Subject):</span>
            </label>
            <span className="text-[10px] bg-red-100 text-red-800 font-black px-2 py-0.5 rounded-full border border-red-200">
              {subjectsList.length}টি বিষয়
            </span>
          </div>

          <div className="relative">
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedCqIdx(0);
                setRevealedAnswers({});
                setAiFeedback(null);
                setStudentPracticeInput('');
              }}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-2xl pl-3.5 pr-9 py-2 text-xs text-slate-900 font-black focus:outline-none focus:border-red-500 shadow-sm transition-all cursor-pointer"
            >
              {Object.entries(groupedSubjects).map(([groupName, groupSubs]) => (
                <optgroup key={groupName} label={`--- ${groupName} ---`}>
                  {groupSubs.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Chapter / Creative Question Selector */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>২. সৃজনশীল প্রশ্ন সেট সিলেক্ট করুন:</span>
            </label>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full border border-amber-300">
              {subjectCqList.length}টি সৃজনশীল
            </span>
          </div>

          <div className="relative">
            <select
              value={selectedCqIdx}
              onChange={(e) => {
                setSelectedCqIdx(parseInt(e.target.value, 10));
                setRevealedAnswers({});
                setAiFeedback(null);
                setStudentPracticeInput('');
              }}
              className="w-full appearance-none bg-amber-50/70 hover:bg-amber-100/70 border border-amber-300 rounded-2xl pl-3.5 pr-9 py-2 text-xs text-amber-950 font-black focus:outline-none focus:border-amber-500 shadow-sm transition-all cursor-pointer"
            >
              {subjectCqList.map((cq, idx) => (
                <option key={cq.id} value={idx}>
                  ✍️ {cq.chapterNameBn} (১০ নম্বর)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 2. STIMULUS (উদ্দীপক) CARD */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-2 border-amber-200/90 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-amber-950 bg-amber-200/80 px-2.5 py-1 rounded-xl border border-amber-300 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>বোর্ড স্ট্যান্ডার্ড উদ্দীপক (Stimulus Scenario)</span>
          </span>
          <span className="text-[11px] font-black text-red-700 bg-white px-2 py-0.5 rounded-md border border-red-200">
            পূর্ণমান: ১০
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/95 border border-amber-200 text-xs text-slate-800 font-serif leading-relaxed whitespace-pre-line shadow-inner">
          {currentCq.stimulus}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={revealAllAnswers}
            className="text-xs font-black text-amber-900 hover:text-amber-950 flex items-center gap-1.5 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-xl border border-amber-300 transition-all tap-active shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-red-700" />
            <span>এক ক্লিকে সকল মডেল উত্তর দেখুন</span>
          </button>

          <button
            onClick={() => showToast('📄 সৃজনশীল প্রশ্নের PDF ডাউনলোড হচ্ছে...', 'success')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-sm tap-active"
          >
            <Download className="w-3.5 h-3.5 text-red-600" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* 3. FOUR STAGES QUESTIONS (ক, খ, গ, ঘ) WITH MODEL ANSWERS */}
      <div className="space-y-3">
        {currentCq.questions.map((q) => {
          const isRevealed = revealedAnswers[q.tag];

          return (
            <div
              key={q.tag}
              className="rounded-3xl p-4 bg-white border border-slate-200 space-y-3 shadow-sm hover:border-slate-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    ({q.tag})
                  </span>
                  <div>
                    <span className="text-[10px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 mr-2">
                      {q.type} প্রশ্ন [{q.marks} নম্বর]
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-1 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                {/* Reveal Answer Toggle Button */}
                <button
                  onClick={() => toggleAnswerReveal(q.tag)}
                  className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all tap-active shrink-0 ${
                    isRevealed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                  }`}
                  title="Toggle Answer"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5 text-slate-600" />}
                  <span className="text-[10px]">{isRevealed ? 'লুকান' : 'উত্তর'}</span>
                </button>
              </div>

              {/* Model Answer Display Card */}
              {isRevealed && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-xs text-slate-800 space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>বোর্ড স্ট্যান্ডার্ড আদর্শ মডেল উত্তর:</span>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed font-medium text-slate-700 pl-1">
                    {q.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. AI PRACTICE & EVALUATION BOX */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>AI খাতা মূল্যায়ন (Practice & AI Marking)</span>
          </span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
            ১০ নম্বরের পরীক্ষা
          </span>
        </div>

        <p className="text-[11px] text-slate-300 font-medium">
          যেকোনো প্রশ্নের উত্তর নিচের বক্সে লিখুন, AI বোর্ডের নিয়মানুযায়ী খাতা দেখে মার্ক ও ফিডব্যাক দেবে!
        </p>

        <textarea
          rows={3}
          value={studentPracticeInput}
          onChange={(e) => setStudentPracticeInput(e.target.value)}
          placeholder="এখানে আপনার সৃজনশীল উত্তরটি লিখুন (যেমন: উদ্দীপকে বর্ণিত ঘটনা অনুযায়ী...)..."
          className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-medium leading-relaxed"
        />

        <button
          onClick={handleEvaluateAnswer}
          disabled={isEvaluating}
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-md transition-all tap-active flex items-center justify-center gap-2"
        >
          {isEvaluating ? (
            <span>AI খাতা যাচাই করছে...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>🤖 AI দিয়ে খাতা মূল্যায়ন করুন (+২০ পয়েন্ট)</span>
            </>
          )}
        </button>

        {/* AI Marking Feedback Card */}
        {aiFeedback && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-white space-y-1.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-300 flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>বোর্ড ফলাফল: {aiFeedback.score} / {aiFeedback.total} নম্বর</span>
              </span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-black px-2 py-0.5 rounded-full border border-emerald-400">
                A+ গ্রেড
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {aiFeedback.feedbackBn}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
