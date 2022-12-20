###############################################################################
## Begin source files
set(JS_SRCS
  src/assembler/jit/ExecutableAllocator.cpp

  src/builtin/Eval.cpp
  src/builtin/Intl.cpp
  src/builtin/MapObject.cpp
  src/builtin/Object.cpp
  src/builtin/Profilers.cpp
  src/builtin/RegExp.cpp
  src/builtin/SIMD.cpp
  src/builtin/TestingFunctions.cpp
  src/builtin/TypedObject.cpp

  src/devtools/sharkctl.cpp

  src/ds/LifoAlloc.cpp
  
  src/frontend/BytecodeCompiler.cpp
  src/frontend/BytecodeEmitter.cpp
  src/frontend/FoldConstants.cpp
  src/frontend/NameFunctions.cpp
  src/frontend/ParseMaps.cpp
  src/frontend/ParseNode.cpp
  src/frontend/Parser.cpp
  src/frontend/TokenStream.cpp
  
  src/gc/Barrier.cpp
  src/gc/Iteration.cpp
  src/gc/Marking.cpp
  src/gc/Memory.cpp
  src/gc/Nursery.cpp
  src/gc/RootMarking.cpp
  src/gc/Statistics.cpp
  src/gc/StoreBuffer.cpp
  src/gc/Tracer.cpp
  src/gc/Verifier.cpp
  src/gc/Zone.cpp

  src/perf/jsperf.cpp
  
  src/vm/ArgumentsObject.cpp
  src/vm/ArrayBufferObject.cpp
  src/vm/CallNonGenericMethod.cpp
  src/vm/CharacterEncoding.cpp
  src/vm/Compression.cpp
  src/vm/DateTime.cpp
  src/vm/Debugger.cpp
  src/vm/DebuggerMemory.cpp
  src/vm/ErrorObject.cpp
  src/vm/ForkJoin.cpp
  src/vm/GlobalObject.cpp
  src/vm/Id.cpp
  src/vm/Interpreter.cpp
  src/vm/MemoryMetrics.cpp
  src/vm/Monitor.cpp
  src/vm/ObjectImpl.cpp
  src/vm/OldDebugAPI.cpp
  src/vm/PIC.cpp
  src/vm/Probes.cpp
  src/vm/PropertyKey.cpp
  src/vm/ProxyObject.cpp
  src/vm/RegExpObject.cpp
  src/vm/RegExpStatics.cpp
  src/vm/Runtime.cpp
  src/vm/SavedStacks.cpp
  src/vm/ScopeObject.cpp
  src/vm/SelfHosting.cpp
  src/vm/Shape.cpp
  src/vm/SharedArrayObject.cpp
  src/vm/SPSProfiler.cpp
  src/vm/Stack.cpp
  src/vm/String.cpp
  src/vm/StringBuffer.cpp
  src/vm/StructuredClone.cpp
  src/vm/ThreadPool.cpp
  src/vm/TypedArrayObject.cpp
  src/vm/Unicode.cpp
  src/vm/Value.cpp
  src/vm/WeakMapPtr.cpp
  src/vm/Xdr.cpp

  src/yarr/PageBlock.cpp
  src/yarr/YarrCanonicalizeUCS2.cpp
  src/yarr/YarrInterpreter.cpp
  src/yarr/YarrPattern.cpp
  src/yarr/YarrSyntaxChecker.cpp
  
  src/jsalloc.cpp
  src/jsanalyze.cpp
  src/jsapi.cpp
  src/jsarray.cpp
  src/jsatom.cpp
  src/jsbool.cpp
  src/jscntxt.cpp
  src/jscompartment.cpp
  src/jscrashreport.cpp
  src/jsdate.cpp
  src/jsdtoa.cpp
  src/jsexn.cpp
  src/jsfriendapi.cpp
  src/jsfun.cpp
  src/jsgc.cpp
  src/jsinfer.cpp
  src/jsiter.cpp
  src/jsmath.cpp
  src/jsnativestack.cpp
  src/jsnum.cpp
  src/jsobj.cpp
  src/json.cpp
  src/jsonparser.cpp
  src/jsopcode.cpp
  src/jsprf.cpp
  src/jspropertytree.cpp
  src/jsproxy.cpp
  src/jsreflect.cpp
  src/jsscript.cpp
  src/jsstr.cpp
  src/jsutil.cpp
  src/jswatchpoint.cpp
  src/jsweakmap.cpp
  src/jsworkers.cpp
  src/jswrapper.cpp
  src/prmjtime.cpp)

if(JS_POSIX_NSPR)
  list(APPEND JS_SRCS
    src/vm/PosixNSPR.cpp)
endif()

if(MOZ_INSTRUMENTS)
  list(APPEND JS_SRCS
    src/devtools/Instruments.cpp)
endif()

if(ENABLE_TRACE_LOGGING)
  list(APPEND JS_SRCS
    src/vm/TraceLogging.cpp)
endif()

if(ENABLE_ION)
  list(APPEND JS_SRCS
    src/jit/shared/BaselineCompiler-shared.cpp
    src/jit/shared/CodeGenerator-shared.cpp
    src/jit/shared/Lowering-shared.cpp
    # TODO: Platform specific sources

    src/jit/AliasAnalysis.cpp
    src/jit/AsmJS.cpp
    src/jit/AsmJSLink.cpp
    src/jit/AsmJSModule.cpp
    src/jit/AsmJSSignalHandlers.cpp
    src/jit/BacktracingAllocator.cpp
    src/jit/Bailouts.cpp
    src/jit/BaselineBailout.cpp
    src/jit/BaselineCompiler.cpp
    src/jit/BaselineDebugModeOSR.cpp
    src/jit/BaselineFrame.cpp
    src/jit/BaselineFrameInfo.cpp
    src/jit/BaselineIC.cpp
    src/jit/BaselineInspector.cpp
    src/jit/BaselineJIT.cpp
    src/jit/BitSet.cpp
    src/jit/BytecodeAnalysis.cpp
    src/jit/C1Spewer.cpp
    src/jit/CodeGenerator.cpp
    src/jit/CompileWrappers.cpp
    src/jit/EdgeCaseAnalysis.cpp
    src/jit/EffectiveAddressAnalysis.cpp
    src/jit/Ion.cpp
    src/jit/IonAnalysis.cpp
    src/jit/IonBuilder.cpp
    src/jit/IonCaches.cpp
    src/jit/IonFrames.cpp
    src/jit/IonMacroAssembler.cpp
    src/jit/IonOptimizationLevels.cpp
    src/jit/IonSpewer.cpp
    src/jit/JitOptions.cpp
    src/jit/JSONSpewer.cpp
    src/jit/LICM.cpp
    src/jit/LinearScan.cpp
    src/jit/LIR.cpp
    src/jit/LiveRangeAllocator.cpp
    src/jit/Lowering.cpp
    src/jit/MCallOptimize.cpp
    src/jit/MIR.cpp
    src/jit/MIRGraph.cpp
    src/jit/MoveResolver.cpp
    src/jit/ParallelFunctions.cpp
    src/jit/ParallelSafetyAnalysis.cpp
    src/jit/PerfSpewer.cpp
    src/jit/RangeAnalysis.cpp
    src/jit/Recover.cpp
    src/jit/RegisterAllocator.cpp
    src/jit/RematerializedFrame.cpp
    src/jit/Safepoints.cpp
    src/jit/Snapshots.cpp
    src/jit/StupidAllocator.cpp
    src/jit/TypeDescrSet.cpp
    src/jit/TypePolicy.cpp
    src/jit/UnreachableCodeElimination.cpp
    src/jit/ValueNumbering.cpp
    src/jit/VMFunctions.cpp)

  # x86 or x86_64
  #if CONFIG['TARGET_CPU'].find('86') != -1:
  list(APPEND JS_SRCS
    src/jit/shared/Assembler-x86-shared.cpp
    src/jit/shared/BaselineCompiler-x86-shared.cpp
    src/jit/shared/BaselineIC-x86-shared.cpp
    src/jit/shared/CodeGenerator-x86-shared.cpp
    src/jit/shared/Lowering-x86-shared.cpp
    src/jit/shared/MacroAssembler-x86-shared.cpp
    src/jit/shared/MoveEmitter-x86-shared.cpp)

  if(PLATFORM_ARCH MATCHES 64)
    list(APPEND JS_SRCS
      src/jit/x64/Assembler-x64.cpp
      src/jit/x64/Bailouts-x64.cpp
      src/jit/x64/BaselineCompiler-x64.cpp
      src/jit/x64/BaselineIC-x64.cpp
      src/jit/x64/CodeGenerator-x64.cpp
      src/jit/x64/Lowering-x64.cpp
      src/jit/x64/MacroAssembler-x64.cpp
      src/jit/x64/Trampoline-x64.cpp)
  else()
    list(APPEND JS_SRCS
      src/jit/x86/Assembler-x86.cpp
      src/jit/x86/Bailouts-x86.cpp
      src/jit/x86/BaselineCompiler-x86.cpp
      src/jit/x86/BaselineIC-x86.cpp
      src/jit/x86/CodeGenerator-x86.cpp
      src/jit/x86/Lowering-x86.cpp
      src/jit/x86/MacroAssembler-x86.cpp
      src/jit/x86/Trampoline-x86.cpp)
  endif()
endif()

if(WIN32)
  list(APPEND JS_SRCS
    src/assembler/jit/ExecutableAllocatorWin.cpp
    src/yarr/OSAllocatorWin.cpp)
else()
  list(APPEND JS_SRCS
    src/assembler/jit/ExecutableAllocatorPosix.cpp
    src/yarr/OSAllocatorPosix.cpp)
endif()

#TODO
#ifneq (,$(filter arm% sparc %86 x86_64 mips%,$(TARGET_CPU)))
if(ENABLE_ION OR ENABLE_YARR_JIT)
  if(JS_CODEGEN_X86 OR JS_CODEGEN_X64)
    list(APPEND JS_SRCS
      src/assembler/assembler/MacroAssemblerX86Common.cpp)
  else()
    list(APPEND JS_SRCS
      src/assembler/assembler/ARMAssembler.cpp
      src/assembler/assembler/MacroAssemblerARM.cpp)
  endif()
endif()

if(ENABLE_YARR_JIT)
  list(APPEND JS_SRCS
    src/yarr/YarrJIT.cpp)
endif()

if(JS_HAS_CTYPES)
  list(APPEND JS_SRCS
    src/ctypes/CTypes.cpp
    src/ctypes/Library.cpp)
endif()

if(MOZ_VTUNE)
  list(APPEND JS_SRCS
    src/vtune/jitprofiling.c)
endif()

if(HAVE_LINUX_PERF_EVENT_H)
  list(APPEND JS_SRCS
    src/perf/pm_linux.cpp)
else()
  list(APPEND JS_SRCS
    src/perf/pm_stub.cpp)
endif()
## End source files
###############################################################################
## Begin static library
add_library(js ${JS_SRCS})

add_dependencies(js host_jskwgen)

target_include_directories(js
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/assembler
    ${CMAKE_CURRENT_SOURCE_DIR}/../intl/icu/src/common
    ${CMAKE_CURRENT_SOURCE_DIR}/../intl/icu/src/i18n
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/public
    # $:/src and BIN_DIR should be private but make public for now until
    # we can expose all the necessary public headers individually.
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_link_libraries(js PUBLIC mfbt)

if(WIN32)
  target_link_libraries(js PUBLIC winmm)
endif()
## End static library
###############################################################################
## Begin auto-generated files
configure_file(js-config.h.in js-config.h)

add_executable(host_jskwgen src/jskwgen.cpp)

add_custom_command(
  OUTPUT jsautokw.h
  COMMAND host_jskwgen jsautokw.h
  DEPENDS host_jskwgen
  COMMENT "Generating jsautokw.h"
  VERBATIM)

set_source_files_properties(jsautokw.h PROPERTIES GENERATED TRUE)
target_sources(js PRIVATE jsautokw.h)

#add_executable(host_jsoplengen src/jsoplengen.cpp)
#
#add_custom_command(
#  OUTPUT jsautooplen.h
#  COMMAND host_jsoplengen jsautooplen.h
#  DEPENDS host_jsoplengen
#  COMMENT "Generating jsautooplen.h"
#  VERBATIM)
#
#set_source_files_properties(jsautooplen.h PROPERTIES GENERATED TRUE)
#target_sources(js PRIVATE jsautooplen.h)

set(SELFHOSTING_SRCS
  src/builtin/Utilities.js
  src/builtin/ParallelUtilities.js
  src/builtin/Array.js
  src/builtin/Date.js
  src/builtin/Intl.js
  src/builtin/IntlData.js
  src/builtin/Iterator.js
  src/builtin/Map.js
  src/builtin/Number.js
  src/builtin/String.js
  src/builtin/Set.js
  src/builtin/TypedObject.js)

add_custom_command(
  OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/selfhosted.out.h
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
  # HINT: /EP flag is required for MSVC C++ compiler to work
  COMMAND py src/builtin/embedjs.py -DDEBUG=1 -p "${CMAKE_CXX_COMPILER} /EP" -m src/js.msg -o ${CMAKE_CURRENT_BINARY_DIR}/selfhosted.out.h -s ${CMAKE_CURRENT_BINARY_DIR}/selfhosted.js ${SELFHOSTING_SRCS}
  DEPENDS ${SELFHOSTING_SRCS} src/js.msg
  COMMENT "Generating selfhosted.out.h"
  VERBATIM)

set_source_files_properties(selfhosted.out.h PROPERTIES GENERATED TRUE)
target_sources(js PRIVATE selfhosted.out.h)
## End auto-generated files
###############################################################################
## Begin install directives
install(TARGETS js
  DESTINATION ${CMAKE_INSTALL_PREFIX}/lib)
install(DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/public/js"
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include)

set(JS_PUBLIC_HDRS
  ${CMAKE_CURRENT_BINARY_DIR}/js-config.h
  src/perf/jsperf.h
  src/js.msg
  src/jsapi.h
  src/jsalloc.h
  src/jsbytecode.h
  src/jsclist.h
  src/jscpucfg.h
  src/jsfriendapi.h
  src/jsproxy.h
  src/jsprf.h
  src/jsprototypes.h
  src/jspubtd.h
  src/jstypes.h
  src/jsversion.h
  src/jswrapper.h)

install(FILES ${JS_PUBLIC_HDRS}
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include)

install(FILES src/ds/BitArray.h
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include/ds)
## End install directives
###############################################################################
