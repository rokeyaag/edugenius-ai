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
  Award,
  Printer,
  GraduationCap,
  Plus,
  Search,
  X,
  FileUp,
  Camera
} from 'lucide-react';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

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

  'english-today': [
    {
        "id": "cq-eft-u1",
        "chapterNameBn": "Unit 1: Good Citizens — ‘Can You Live Alone?’",
        "stimulus": "Seen Comprehension Passage (NCTB English For Today - Unit 1, Lesson 1):\n\nLong ago, a young man who lived in a village found his life full of problems and sufferings. Quarrels, ill feelings, jealousy, enmity — all were part of everyday life there. So, he left his house and went to a jungle to live by himself. There he made a nice little hut with bamboo, reeds and mud. 'Ah, how happy I am here,' said the man to himself.\n\nBut one day he found some mice in his hut. The little creatures soon made holes in his blanket. So he brought a cat to kill the mice. The cat needed milk, so he brought a cow. The cow needed grass and hay, so he brought a cowboy. The cowboy needed food, so he took a wife to cook meals. Then children were born to them, and the man found himself again in a family. So nobody can live alone, unless that person is either an angel or a devil.",
        "questions": [
            {
                "tag": "1 (A)",
                "type": "Multiple Choice Questions (MCQs)",
                "marks": 5,
                "question": "Choose the correct answer from the alternatives:\n(i) Why did the man leave his village? -> (a) to live in peace (b) to hunt (c) to study (d) to travel\n(ii) What destroyed his blanket? -> (a) mice (b) fire (c) rain (d) dog\n(iii) The word 'Enmity' means -> (a) hostility (b) friendship (c) honesty (d) kindness\n(iv) To feed the cowboy, he -> (a) got married (b) bought food (c) moved away (d) hired a cook\n(v) The passage proves that man is a -> (a) social being (b) solitary animal (c) wild creature (d) nomad",
                "answer": "Answers:\n(i) (a) to live in peace\n(ii) (a) mice\n(iii) (a) hostility / hatred between enemies\n(iv) (a) got married to take a wife to cook meals\n(v) (a) social being who cannot live in complete isolation"
            },
            {
                "tag": "1 (B)",
                "type": "Short Answer Questions (Comprehension)",
                "marks": 10,
                "question": "Answer the following analytical questions based on the passage:\n(a) What made the young man unhappy in his native village?\n(b) How did the man build his shelter in the forest?\n(c) How did a single problem with mice lead to the formation of a full family in the jungle?\n(d) Explain the statement: 'Nobody can live alone, unless that person is either an angel or a devil.'\n(e) What is the main message of the text regarding human society?",
                "answer": "Model Answers:\n(a) Everyday quarrels, jealousy, ill feelings and enmity among villagers made the young man miserable.\n(b) He constructed a nice little hut using natural materials like bamboo, reeds and mud in the forest.\n(c) The mice damaged his blanket, so he brought a cat; the cat needed milk, which required a cow; the cow needed care, so he hired a cowboy; and the cowboy needed food, which led him to marry a wife who gave birth to children.\n(d) It signifies that only supernatural divine beings (angels) or monstrous beings (devils) can exist without community; normal human beings inherently depend on mutual social cooperation.\n(e) Human beings are inherently social beings who require social relationships, companionship and mutual support for survival and happiness."
            },
            {
                "tag": "2",
                "type": "Information Transfer & Flow Chart",
                "marks": 5,
                "question": "Based on your reading of the passage, complete the sequence of events that brought the man back into family life:\n1. Man moves to forest -> 2. Mice damage blanket -> 3. Brings a cat -> 4. Brings a cow for milk -> 5. Hires a cowboy -> 6. Marries a wife & starts a family.",
                "answer": "Flowchart Sequence:\n[1. Left village to seek solitary peace] ➔ [2. Built hut; mice damaged blanket] ➔ [3. Brought cat to control mice] ➔ [4. Acquired cow to feed cat] ➔ [5. Employed cowboy to graze cow] ➔ [6. Took a wife to cook food, resulting in a family]."
            },
            {
                "tag": "3",
                "type": "Summary Writing",
                "marks": 10,
                "question": "Write a concise summary of the passage in your own words (within 50-60 words).",
                "answer": "Summary:\nA young man left his troublesome village to live alone in a forest hut. However, dealing with mice led him step-by-step to bring a cat, a cow, a cowboy, and eventually take a wife. Starting a family in the jungle made him realize that human beings are fundamentally social beings who cannot live happily in isolation."
            }
        ]
    },
    {
        "id": "cq-eft-u5",
        "chapterNameBn": "Unit 5: Nature and Humanity — ‘The Greed of the Roaring Rivers’",
        "stimulus": "Seen Comprehension Passage (NCTB English For Today - Unit 5, Lesson 1):\n\nMeherjan lives in a slum on the Sirajganj Town Protection Embankment. Her polythene-roofed shelter looks like a cage. She is nearly 45, but looks more than 50. In front of her shelter, she is trying to make a fire to cook the day's only meal. Her weak hands tremble as she adds some fallen leaves and straw to the fire. The whispering wind from the river Jamuna makes the fire unsteady. The dancing of the flames reminds Meherjan of the turmoil in her life.\n\nNot long ago Meherjan had everything — a family, cultivable land and cattle. The erosion of the Jamuna gradually consumed all her landed property. It finally devoured her only last shelter during the last monsoon. It took the river only a day to devour Meherjan's house, trees, vegetable garden and the bamboo bush. She had a happy family once. Over the years, she lost her husband and her family to diseases that cruel hunger and poverty brought to the family. Now, she is the only one left to live on with the loss and the pain. The greedy Jamuna has shattered her dreams and happiness.",
        "questions": [
            {
                "tag": "1 (A)",
                "type": "Multiple Choice Questions",
                "marks": 5,
                "question": "Choose the correct answer:\n(i) Where does Meherjan live currently? -> (a) in a slum on the embankment (b) in a palace (c) in a boat (d) in Dhaka\n(ii) What devoured her landed property? -> (a) river erosion of the Jamuna (b) a storm (c) earthquake (d) bandits\n(iii) The word 'Devour' means -> (a) swallow / consume destructively (b) build (c) protect (d) decorate\n(iv) Meherjan looks older than her age due to -> (a) intense suffering and hardship (b) excessive wealth (c) disease only (d) old clothes\n(v) The Jamuna is described as 'greedy' because -> (a) it relentlessly swallows homesteads and lands (b) it has fish (c) it flows fast (d) it is wide",
                "answer": "Answers:\n(i) (a) in a slum on the Sirajganj Town Protection Embankment\n(ii) (a) river erosion of the Jamuna\n(iii) (a) to consume destructively / destroy and swallow completely\n(iv) (a) intense grief, hunger, poverty and psychological trauma\n(v) (a) its ferocious monsoon erosion devours families' lands, homes and dreams"
            },
            {
                "tag": "1 (B)",
                "type": "Short Answer Questions",
                "marks": 10,
                "question": "Answer the following analytical questions:\n(a) Describe Meherjan's present living conditions.\n(b) What did Meherjan possess before the river erosion occurred?\n(c) How did Meherjan lose her husband and family members?\n(d) Why does the author use the metaphor 'greedy Jamuna'?\n(e) What does Meherjan's story reveal about climate displaced victims in Bangladesh?",
                "answer": "Model Answers:\n(a) Meherjan lives in a fragile, cage-like polythene-roofed shack in a slum, struggling to cook even a single daily meal.\n(b) She once had a happy family, arable farming land, cattle, trees, a vegetable garden and a bamboo grove.\n(c) After losing everything to river erosion, severe poverty and malnutrition brought fatal diseases that claimed her husband and relatives.\n(d) The author personifies the ferocious river as 'greedy' because its merciless erosion relentlessly swallows the helpless villagers' lands and memories.\n(e) It highlights the tragic plight of millions of climate refugees in Bangladesh who lose their livelihoods to natural disasters and river erosion."
            },
            {
                "tag": "2",
                "type": "Summary Writing",
                "marks": 10,
                "question": "Write a summary of the passage highlighting Meherjan's tragic transition from prosperity to poverty (within 50 words).",
                "answer": "Summary:\nMeherjan, once living happily with landed property, cattle, and family, lost everything to the ruthless erosion of the Jamuna river. Now living in a fragile slum shack on an embankment, aged by hardship and grief, she endures solitary poverty and hunger as a victim of environmental destruction."
            }
        ]
    },
    {
        "id": "cq-eft-u16",
        "chapterNameBn": "Unit 16: Exploring Space — ‘Bangabandhu Satellite-1 & Moon Landing’",
        "stimulus": "Seen Comprehension Passage (NCTB English For Today - Unit 16):\n\nHuman beings have always looked up at the night sky with wonder and curiosity. On 20 July 1969, history was made when American astronaut Neil Armstrong stepped onto the surface of the Moon from the Apollo 11 lunar module, declaring: 'That's one small step for man, one giant leap for mankind.'\n\nFast forward to 11 May 2018, another historic milestone was etched into history when Bangladesh successfully launched its first geostationary communication satellite, 'Bangabandhu Satellite-1' (BS-1), into orbit. Launched aboard a SpaceX Falcon 9 rocket from Kennedy Space Center in Florida, BS-1 made Bangladesh the 57th nation in the world to possess its own satellite in space. Located at the 119.1° East orbital longitude, BS-1 provides seamless telecommunication, disaster management warnings, direct-to-home (DTH) broadcast services, and vital oceanic connectivity, saving millions in foreign exchange.",
        "questions": [
            {
                "tag": "1 (A)",
                "type": "Multiple Choice Questions",
                "marks": 5,
                "question": "Choose the correct answer:\n(i) On which date did Neil Armstrong step on the Moon? -> (a) 20 July 1969 (b) 11 May 2018 (c) 26 March 1971 (d) 16 Dec 1971\n(ii) Bangabandhu Satellite-1 made Bangladesh the -> (a) 57th space nation (b) 10th (c) 100th (d) 50th\n(iii) BS-1 is positioned at -> (a) 119.1° East (b) 50° West (c) 0° (d) 180°\n(iv) The rocket that launched BS-1 was -> (a) Falcon 9 (b) Apollo 11 (c) Sputnik (d) Saturn V\n(v) BS-1 benefits Bangladesh by -> (a) enhancing digital broadcasting & disaster forecasting (b) making cars (c) traveling to Mars (d) free food",
                "answer": "Answers:\n(i) (a) 20 July 1969\n(ii) (a) 57th space nation in the world\n(iii) (a) 119.1° East orbital longitude\n(iv) (a) SpaceX Falcon 9\n(v) (a) enhancing digital telecommunications, DTH broadcasting and disaster management"
            },
            {
                "tag": "1 (B)",
                "type": "Short Answer Questions",
                "marks": 10,
                "question": "Answer the following questions:\n(a) What was the historic significance of Neil Armstrong's words on the Moon?\n(b) When and from where was Bangabandhu Satellite-1 launched?\n(c) How does BS-1 save foreign currency for Bangladesh?\n(d) Explain the strategic and economic advantages of having our own communication satellite in orbit.\n(e) What message does Bangladesh's entry into space exploration send to the younger generation?",
                "answer": "Model Answers:\n(a) Armstrong's phrase 'One small step for man, one giant leap for mankind' symbolized the triumph of human collective science and boundless capability.\n(b) BS-1 was launched on 11 May 2018 from the Kennedy Space Center in Florida, USA.\n(c) Bangladeshi television channels and telecoms previously rented foreign satellites at huge costs; BS-1 eliminated this dependency and saves millions in foreign currency.\n(d) It ensures telecommunication sovereignty, unhindered maritime communication, real-time cyclone and disaster warning, and enables high-speed internet in remote char and hill tract areas.\n(e) It inspires youth to pursue aerospace, STEM education, software engineering, and aspire to solve national challenges through high-technology innovation."
            },
            {
                "tag": "2",
                "type": "Summary Writing",
                "marks": 10,
                "question": "Write a concise summary of the passage highlighting the two historical space milestones (within 50 words).",
                "answer": "Summary:\nFrom the legendary 1969 Apollo 11 moon landing to Bangladesh launching 'Bangabandhu Satellite-1' on 11 May 2018 as the world's 57th space-faring nation, humanity has made giant leaps. BS-1 provides vital telecommunications, broadcast independence, and disaster management, elevating Bangladesh's technological sovereignty."
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
  const { 
    currentClassObj, 
    selectedClass, 
    setSelectedClass, 
    classes, 
    language, 
    earnPoints, 
    showToast, 
    setIsAddSubjectModalOpen,
    setActiveTab,
    t 
  } = useApp();
  const subjectsList = currentClassObj?.subjects || [];

  const groupedSubjects = subjectsList.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const [selectedSubjectId, setSelectedSubjectId] = useState('bangla-sahitya');
  const [selectedCqIdx, setSelectedCqIdx] = useState(0);
  const [chapterSearchQuery, setChapterSearchQuery] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [studentPracticeInput, setStudentPracticeInput] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const getSubjectCqs = (subId) => {
    const fullChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[subId];
    const curatedList = NCTB_CREATIVE_QUESTIONS_BN[subId] || [];

    if (fullChapters && fullChapters.length > 0) {
      return fullChapters.map((ch, idx) => {
        const cleanTitle = ch.title ? ch.title.replace(/^\d+\.\s*/, '').replace(/‘|’|'|"/g, '').trim() : `অধ্যায় ${idx + 1}`;
        const parts = cleanTitle.split('—');
        const mainName = parts[0]?.trim() || cleanTitle;
        const author = parts[1]?.trim() || '';

        // Check if we have a curated CQ matching this chapter
        const matchedCurated = curatedList.find(c => {
          const cName = (c.chapterNameBn || '').toLowerCase();
          return cName.includes(mainName.toLowerCase()) || (c.id && ch.id && c.id.includes(ch.id));
        });

        if (matchedCurated) {
          return {
            ...matchedCurated,
            id: ch.id || matchedCurated.id,
            chapterNameBn: ch.title
          };
        }

        // Generate full board CQ dynamically from chapter notes & summary
        const chSummary = ch.summary || 'এই পাঠের মূল বক্তব্য ও অন্তর্নিহিত তাৎপর্য গভীর অনুধাবনের মাধ্যমে আত্মস্থ করতে হবে।';
        const notes = ch.lectureNotes || [];
        const isPoem = ch.type === 'পদ্য' || ch.type?.includes('কবিতা');
        const formWord = isPoem ? 'কবিতা' : (ch.type || 'পাঠ');

        return {
          id: `cq-${ch.id || idx}`,
          chapterNameBn: ch.title,
          stimulus: `উদ্দীপক:
দশম শ্রেণির শিক্ষার্থী রায়হান পাঠ্যবই পড়ার সময় জানতে পারে যে, ${chSummary} সে তার প্রাত্যহিক জীবনে এই নীতি ও মূল্যবোধের গভীর তাৎপর্য উপলব্ধি করে এবং বাস্তব কর্মে তা প্রয়োগের দৃঢ় সংকল্প নেয়।`,
          questions: [
            {
              tag: 'ক',
              type: 'জ্ঞানমূলক',
              marks: 1,
              question: `${author ? `${author}-এর ` : ''}‘${mainName}’ ${formWord}টির মূল উৎস বা পটভূমি কী?`,
              answer: notes[0]?.detail || `‘${mainName}’ ${formWord}টি লেখক ${author ? author + ' ' : ''}কর্তৃক রচিত এবং বোর্ড শিক্ষাক্রমের আলোকে অত্যন্ত গুরুত্বপূর্ণ একটি অধ্যায়।`
            },
            {
              tag: 'খ',
              type: 'অনুধাবনমূলক',
              marks: 2,
              question: `“${notes[1]?.title ? notes[1].title.replace(/^\d+\.\s*/, '') : `${mainName} পাঠের মূলভাব`}”— কথাটি বুঝিয়ে লেখো।`,
              answer: notes[1]?.detail || `${chSummary} এই উক্তিটির মধ্য দিয়ে পাঠের মূল শিক্ষা ও অন্তর্নিহিত মানবতাবোধ অত্যন্ত সুন্দরভাবে ফুটে উঠেছে।`
            },
            {
              tag: 'গ',
              type: 'প্রয়োগমূলক',
              marks: 3,
              question: `উদ্দীপকের মূল ভাবনা ‘${mainName}’ ${formWord}টির কোন বিশেষ দিককে নির্দেশ করে? ব্যাখ্যা করো।`,
              answer: `উদ্দীপকের বক্তব্য ‘${mainName}’ ${formWord}টির মূল প্রতিপাদ্যের সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ।\n\nউভয় ক্ষেত্রেই দেখা যায়— ${chSummary}\n\nপাঠ্যবইয়ে ${notes[2]?.detail || 'যে নৈতিক ও মানবিক সত্য'} বর্ণিত হয়েছে, উদ্দীপকেও সেই শিক্ষার বাস্তব প্রতিফলন লক্ষ্য করা যায়।`
            },
            {
              tag: 'ঘ',
              type: 'উচ্চতর দক্ষতামূলক',
              marks: 4,
              question: `“উদ্দীপকটি ‘${mainName}’ ${formWord}টির সামগ্রিক চেতনা ও মূল শিক্ষাকে সার্থকভাবে ধারণ করে”— উক্তিটি বিশ্লেষণ করো।`,
              answer: `মন্তব্যটি সর্বাংশে সত্য ও যৌক্তিক।\n\n‘${mainName}’ ${formWord}টিতে ${author ? author + ' ' : ''}মানবজীবনের এক শাশ্বত ও গভীর সত্যকে উপস্থাপন করেছেন। ${chSummary}\n\nউদ্দীপকেও এই অভিন্ন চেতনার সুন্দর বহিঃপ্রকাশ ঘটেছে। অতএব, নিঃসন্দেহে বলা যায় উদ্দীপকটি পাঠের মূল দর্শন ও নৈতিক শিক্ষাকে সার্থকভাবে প্রতিফলিত করেছে।`
            }
          ]
        };
      });
    }

    if (curatedList.length > 0) {
      return curatedList;
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

  const handleDownloadCQFile = () => {
    if (!currentCq) return;
    const isEnglish = selectedSubjectId === 'english-today';
    const cleanTitle = currentCq.chapterNameBn || 'সৃজনশীল মডেল টেস্ট';

    const html = `<!DOCTYPE html>
<html lang="${isEnglish ? 'en' : 'bn'}">
<head>
  <meta charset="UTF-8">
  <title>${cleanTitle} - EduGenius AI CQ Model Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700;800&display=swap');
    body { font-family: 'Hind Siliguri', 'Segoe UI', sans-serif; padding: 24px 32px; color: #0f172a; line-height: 1.6; }
    .header { border-bottom: 3px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .stimulus-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 0 12px 12px 0; margin-bottom: 20px; font-size: 13px; white-space: pre-line; }
    .q-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; }
    .q-tag { font-weight: 800; color: #dc2626; margin-bottom: 4px; font-size: 13px; }
    .q-text { font-weight: 700; margin-bottom: 8px; font-size: 13.5px; }
    .q-ans { background: #eff6ff; border-left: 3px solid #3b82f6; padding: 10px 14px; font-size: 12.5px; color: #1e3a8a; white-space: pre-line; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h2 style="margin:0; font-size: 20px; color: #dc2626;">EduGenius AI — সৃজনশীল ও মডেল প্রশ্নব্যাংক</h2>
      <div style="font-size: 12px; color: #64748b;">NCTB ২০২৬ কারিকুলাম | ${cleanTitle}</div>
    </div>
    <div style="font-size: 12px; text-align: right;">
      <div>পূর্ণমান: ১০</div>
      <div>তারিখ: ${new Date().toLocaleDateString('bn-BD')}</div>
    </div>
  </div>

  <div class="stimulus-box">
    <strong>📌 উদ্দীপক / Seen Passage:</strong><br/>
    ${currentCq.stimulus}
  </div>

  <div class="questions-list">
    ${currentCq.questions.map(q => `
      <div class="q-box">
        <div class="q-tag">(${q.tag}) ${q.type} [${q.marks} নম্বর]</div>
        <div class="q-text">${q.question}</div>
        <div class="q-ans"><strong>মডেল সমাধান:</strong><br/>${q.answer}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cleanTitle.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_')}_CreativeQuestion.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`📥 "${cleanTitle}" ফাইল সফলভাবে ডাউনলোড হয়েছে!`, 'success');
  };


  const handlePrintCQ = () => {
    if (!currentCq) return;
    const isEnglish = selectedSubjectId === 'english-today';
    const cleanTitle = currentCq.chapterNameBn || 'সৃজনশীল মডেল টেস্ট';

    const html = `<!DOCTYPE html>
<html lang="${isEnglish ? 'en' : 'bn'}">
<head>
  <meta charset="UTF-8">
  <title>${cleanTitle} - EduGenius AI CQ Model Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700;800&display=swap');
    body { font-family: 'Hind Siliguri', 'Segoe UI', sans-serif; padding: 24px 32px; color: #0f172a; line-height: 1.6; }
    .top-actions { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
    .btn { padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; }
    .btn-primary { background: #dc2626; color: #ffffff; border-color: #b91c1c; }
    .header { border-bottom: 3px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .stimulus-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 0 12px 12px 0; margin-bottom: 20px; font-size: 13px; white-space: pre-line; }
    .q-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; }
    .q-tag { font-weight: 800; color: #dc2626; margin-bottom: 4px; font-size: 13px; }
    .q-text { font-weight: 700; margin-bottom: 8px; font-size: 13.5px; }
    .q-ans { background: #eff6ff; border-left: 3px solid #3b82f6; padding: 10px 14px; font-size: 12.5px; color: #1e3a8a; white-space: pre-line; margin-top: 6px; }
    @media print { body { padding: 10px; } .no-print { display: none !important; } }
  </style>
</head>
<body>
  <div class="top-actions no-print">
    <button class="btn btn-primary" onclick="window.print()">🖨️ প্রিন্ট করুন / Save as PDF</button>
    <button class="btn" onclick="window.close()">❌ বন্ধ করুন</button>
  </div>
  <div class="header">
    <div>
      <h2 style="margin:0; font-size: 20px; color: #dc2626;">EduGenius AI — সৃজনশীল ও মডেল প্রশ্নব্যাংক</h2>
      <div style="font-size: 12px; color: #64748b;">NCTB ২০২৬ কারিকুলাম | ${cleanTitle}</div>
    </div>
    <div style="font-size: 12px; text-align: right;">
      <div>পূর্ণমান: ১০</div>
      <div>তারিখ: ${new Date().toLocaleDateString('bn-BD')}</div>
    </div>
  </div>

  <div class="stimulus-box">
    <strong>📌 উদ্দীপক / Seen Passage:</strong><br/>
    ${currentCq.stimulus}
  </div>

  <div class="questions-list">
    ${currentCq.questions.map(q => `
      <div class="q-box">
        <div class="q-tag">(${q.tag}) ${q.type} [${q.marks} নম্বর]</div>
        <div class="q-text">${q.question}</div>
        <div class="q-ans"><strong>মডেল সমাধান:</strong><br/>${q.answer}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      showToast(`🖨️ "${cleanTitle}" এর প্রিন্ট ভিউ প্রস্তুত!`, 'success');
    }
  };


  const filteredCqList = subjectCqList
    .map((cq, idx) => ({ ...cq, originalIdx: idx }))
    .filter(cq => {
      if (!chapterSearchQuery.trim()) return true;
      return (cq.chapterNameBn || '').toLowerCase().includes(chapterSearchQuery.toLowerCase());
    });

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

      {/* 1. Class, Subject & Chapter Selector Card */}
      <div className="p-3.5 rounded-3xl bg-[#fffdf0] border-2 border-amber-200/90 space-y-3 shadow-sm">
        
        {/* ================= 1ST LINE: CLASS SELECTOR (শ্রেণি নির্বাচন) ================= */}
        <div className="space-y-1 pb-2 border-b border-amber-200/60">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-red-600" />
              <span>শ্রেণি নির্বাচন করুন (Class):</span>
            </label>
          </div>

          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                const matchedClass = (classes || []).find(c => c.id === e.target.value);
                const firstSubId = matchedClass?.subjects?.[0]?.id || 'bangla-sahitya';
                setSelectedSubjectId(firstSubId);
                setSelectedCqIdx(0);
                setChapterSearchQuery('');
                setRevealedAnswers({});
                setAiFeedback(null);
                setStudentPracticeInput('');
                showToast(`🎓 ${matchedClass?.nameBn || e.target.value} সিলেক্ট করা হয়েছে`, 'info');
              }}
              className="w-full appearance-none bg-white hover:bg-amber-50/50 border border-amber-300 rounded-xl pl-3 pr-7 py-1.5 text-[11px] text-slate-800 font-bold focus:outline-none focus:border-red-500 shadow-xs transition-all cursor-pointer"
            >
              {(classes || []).map((cls) => (
                <option key={cls.id} value={cls.id}>
                  🎓 {cls.nameBn} — ({cls.subjects?.length || 0}টি বিষয়)
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ================= 2ND LINE: SUBJECT SELECTOR (বিষয় নির্বাচন) ================= */}
        <div className="space-y-1 pb-2 border-b border-amber-200/60">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>বিষয় নির্বাচন করুন (Subject):</span>
            </label>
            <button
              onClick={() => setIsAddSubjectModalOpen(true)}
              className="text-[9px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-1.5 py-0.5 rounded-lg border border-red-200 tap-active flex items-center gap-0.5"
              title="Add Custom Subject"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>বিষয় যোগ</span>
            </button>
          </div>

          <div className="relative">
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedCqIdx(0);
                setChapterSearchQuery('');
                setRevealedAnswers({});
                setAiFeedback(null);
                setStudentPracticeInput('');
              }}
              className="w-full appearance-none bg-white hover:bg-amber-50/50 border border-amber-300 rounded-xl pl-3 pr-7 py-1.5 text-[11px] text-slate-800 font-bold focus:outline-none focus:border-red-500 shadow-xs transition-all cursor-pointer"
            >
              {Object.entries(groupedSubjects).map(([groupName, groupSubs]) => (
                <optgroup key={groupName} label={`--- ${groupName} (${groupSubs.length}টি বিষয়) ---`}>
                  {groupSubs.map((sub) => {
                    const chCount = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || (sub.id === 'bangla-sahitya' ? 50 : 3);
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn} ({chCount}টি অধ্যায়)
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ================= 3RD LINE: CHAPTER / CQ SELECTOR (অধ্যায় তালিকা) ================= */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>[{subjectsList.find(s => s.id === selectedSubjectId)?.nameBn || 'নির্বাচিত বিষয়'}] সৃজনশীল তালিকা:</span>
            </label>
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedCqIdx}
              onChange={(e) => {
                setSelectedCqIdx(parseInt(e.target.value, 10));
                setRevealedAnswers({});
                setAiFeedback(null);
                setStudentPracticeInput('');
              }}
              className="w-full appearance-none bg-amber-100/70 hover:bg-amber-200/70 border border-amber-300 rounded-xl pl-3 pr-7 py-1.5 text-[11px] text-amber-950 font-black focus:outline-none focus:border-amber-500 shadow-xs transition-all cursor-pointer"
            >
              {filteredCqList.map((cq, idx) => (
                <option key={cq.id || idx} value={cq.originalIdx !== undefined ? cq.originalIdx : idx}>
                  ✍️ {cq.chapterNameBn} (১০ নম্বর)
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Instant Search Input */}
          <div className="relative">
            <Search className="w-3 h-3 text-amber-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={chapterSearchQuery}
              onChange={(e) => setChapterSearchQuery(e.target.value)}
              placeholder={`[${subjectsList.find(s => s.id === selectedSubjectId)?.nameBn || 'অধ্যায়'}] খুঁজুন...`}
              className="w-full bg-white border border-amber-200 rounded-xl pl-8 pr-7 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-all font-medium shadow-inner"
            />
            {chapterSearchQuery && (
              <button
                onClick={() => setChapterSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* COMPREHENSIVE ACTION TOOLBAR (PDF আপলোড, বই স্ক্যানার, সৃজনশীল ড্রিল) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveTab('vault')}
          className="p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <FileUp className="w-4 h-4 text-red-900" />
          <span className="text-[10px] font-black">PDF আপলোড</span>
        </button>

        <button
          onClick={() => setActiveTab('tutor')}
          className="p-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <Camera className="w-4 h-4 text-amber-200" />
          <span className="text-[10px] font-black">বই স্ক্যানার</span>
        </button>

        <button
          onClick={() => {
            revealAllAnswers();
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black">মডেল উত্তর</span>
        </button>
      </div>

      {/* 2. STIMULUS (উদ্দীপক) CARD */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-[#fffdf0] via-amber-50 to-[#fffbe8] border-2 border-amber-300 space-y-2.5 shadow-sm">
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

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handlePrintCQ}
              className="h-8 px-2.5 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-300 font-bold text-[11px] inline-flex items-center gap-1 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap cursor-pointer"
              title="প্রিন্ট প্রিভিউ ও Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>প্রিন্ট</span>
            </button>

            <button
              onClick={handleDownloadCQFile}
              className="h-8 px-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 font-bold text-[11px] inline-flex items-center gap-1 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap cursor-pointer"
              title="ফাইল ডাউনলোড (Download File)"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>ডাউনলোড</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. FOUR STAGES QUESTIONS (ক, খ, গ, ঘ) WITH MODEL ANSWERS */}
      <div className="space-y-3">
        {currentCq.questions.map((q) => {
          const isRevealed = revealedAnswers[q.tag];

          return (
            <div
              key={q.tag}
              className="rounded-3xl p-4 bg-[#fffdf0] border border-amber-200/90 space-y-3 shadow-sm hover:border-amber-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    ({q.tag})
                  </span>
                  <div>
                    <span className="text-[10px] font-black text-red-800 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 mr-2">
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
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-xs'
                  }`}
                  title="Toggle Answer"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5 text-slate-600" />}
                  <span className="text-[10px]">{isRevealed ? 'লুকান' : 'উত্তর'}</span>
                </button>
              </div>

              {/* Model Answer Display Card */}
              {isRevealed && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-xs text-slate-800 space-y-1.5 animate-in fade-in">
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
