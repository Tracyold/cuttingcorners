(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        var _updateA_modules, _updateB_modules;
        var added = [];
        var deleted = [];
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added, _updateA_deleted, _updateB_deleted;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1.delete(moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1.delete(moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1, _updateB_deleted1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules.delete(moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1.delete(moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                        _iterator5.return();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function() {},
    refresh: function() {},
    buildOk: function() {},
    issues: function(_issues) {}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            var runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return function() {
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/supabase.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServiceClient",
    ()=>createServiceClient,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript) <locals>");
;
;
var supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/AdminLayout.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminCss",
    ()=>adminCss,
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
var NAV_ITEMS = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '⬡',
        route: '/admin/dashboard'
    },
    {
        id: 'products',
        label: 'Products',
        icon: '◈',
        route: '/admin/products'
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        icon: '◻',
        route: '/admin/portfolio'
    },
    {
        id: 'users',
        label: 'User List',
        icon: '◯',
        route: '/admin/users'
    }
];
var adminCss = "\n@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:root{\n  --k0:#060606;--k1:#0d0d0d;--k2:#131313;--k3:#191919;--k4:#202020;\n  --ln:rgba(255,255,255,0.06);--ln2:rgba(255,255,255,0.11);\n  --g:#b89a2a;--gl:#cfb040;--gbg:rgba(184,154,42,0.07);\n  --tx:#ddd;--d1:#777;--d2:#444;--wh:#f0f0f0;--er:#b54040;\n  --serif:'Cormorant',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;\n}\n.shell{display:flex;height:100vh;background:var(--k0);font-family:var(--sans);color:var(--tx);overflow:hidden}\n.sb{width:220px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column}\n.sb-brand{padding:30px 24px 26px;border-bottom:1px solid var(--ln)}\n.sb-name{font-family:var(--serif);font-size:18px;font-weight:400;color:var(--wh);letter-spacing:.07em;line-height:1.3}\n.sb-role{font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--d2);margin-top:6px}\n.sb-nav{flex:1;padding:12px 0}\n.ni{display:flex;align-items:center;gap:12px;padding:14px 24px;font-size:13px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.45);cursor:pointer;border:none;background:none;width:100%;text-align:left;transition:color .15s;position:relative;font-family:var(--sans)}\n.ni::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--gl);opacity:0;transition:opacity .15s}\n.ni.on{color:#d4af37}.ni.on::before{opacity:1}.ni:hover:not(.on){color:#aaa}\n.ni-ic{display:none}\n.ni-bell{position:relative;margin-left:auto}\n.ni-badge{position:absolute;top:-6px;right:-8px;background:var(--gl);color:#000;font-size:7.5px;font-weight:700;min-width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0 3px}\n.sb-foot{padding:16px 24px;border-top:1px solid var(--ln);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--d2);cursor:pointer;transition:color .15s}\n.sb-foot:hover{color:var(--er)}\n.main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--k0)}\n.ph{display:flex;align-items:center;justify-content:space-between;padding:28px 40px;border-bottom:1px solid var(--ln);flex-shrink:0}\n.ph-title{font-family:var(--serif);font-size:26px;font-weight:300;color:var(--wh);letter-spacing:.05em}\n.ph-right{display:flex;align-items:center;gap:14px}\n.ph-actions{display:flex;gap:8px;align-items:center}\n.err-bar{font-size:9.5px;color:var(--er);letter-spacing:.08em;padding:6px 12px;border:1px solid rgba(181,64,64,.25);background:rgba(181,64,64,.07)}\n.btn-add{display:flex;align-items:center;gap:8px;background:var(--gl);color:#000;border:none;padding:11px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .15s}\n.btn-add:hover:not(:disabled){background:#dcc056}.btn-add:disabled{opacity:.4;cursor:not-allowed}\n.btn-sel{background:transparent;color:var(--d1);border:1px solid var(--ln2);padding:11px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .15s}\n.btn-sel:hover{border-color:var(--g);color:var(--gl)}\n.btn-sel.on{border-color:rgba(207,176,64,.4);color:var(--gl);background:var(--gbg)}\n.tabs{display:flex;gap:28px;padding:0 40px;border-bottom:1px solid var(--ln);flex-shrink:0}\n.tab{padding:15px 0;font-size:14px;font-weight:400;letter-spacing:2.7px;text-transform:uppercase;color:var(--d1);cursor:pointer;border:none;background:none;border-bottom:1px solid transparent;position:relative;top:1px;transition:color .15s;font-family:var(--sans)}\n.tab.on{color:var(--wh);border-bottom-color:var(--gl)}.tab:hover:not(.on){color:#aaa}\n.tab-n{margin-left:6px;font-size:11px;color:var(--d2)}.tab.on .tab-n{color:var(--g)}\n.pb{flex:1;overflow-y:auto;padding:0 40px}\n.loading{display:flex;align-items:center;justify-content:center;padding:80px 0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--d2)}\n.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;color:var(--d2)}\n.empty-ic{font-size:28px;opacity:.18;margin-bottom:10px}\n.empty-tx{font-size:10px;letter-spacing:.22em;text-transform:uppercase}\n.tbl{width:100%;border-collapse:collapse}\n.tbl thead tr{border-bottom:1px solid var(--ln)}\n.tbl th{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d2);padding:16px 0 12px;text-align:left}\n.tbl th:last-child{text-align:right}\n.tbl tbody tr{border-bottom:1px solid var(--ln);transition:background .1s;cursor:pointer}\n.tbl tbody tr:hover{background:var(--k2)}\n.tbl td{padding:16px 0;font-size:13px;color:var(--tx);vertical-align:middle}\n.tbl td:last-child{text-align:right}\n.td-name{font-family:var(--serif);font-size:17px;font-weight:400;color:var(--wh)}\n.td-sub{font-size:13px;color:var(--d1);letter-spacing:.07em;margin-top:2px}\n.td-price{font-family:var(--serif);font-size:17px;color:var(--gl)}\n.pill{display:inline-block;font-size:9px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;padding:4px 9px}\n.pill-A{background:rgba(207,176,64,.09);color:var(--gl)}\n.pill-D{background:rgba(255,255,255,.04);color:var(--d1)}\n.pill-I{background:rgba(181,64,64,.1);color:#c07070}\n.ra{display:flex;align-items:center;justify-content:flex-end;gap:6px;opacity:0;transition:opacity .15s}\n.tbl tbody tr:hover .ra{opacity:1}\n.ab{font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s;font-family:var(--sans)}\n.ab:hover{border-color:var(--g);color:var(--gl)}\n.ab.pub{border-color:rgba(207,176,64,.25);color:var(--g)}.ab.pub:hover{background:var(--gbg)}\n.ab.rem:hover{border-color:var(--er);color:#c07070}\n.ab.arc:hover{border-color:var(--er);color:#c07070}\n.ov{position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:stretch}\n.qp{width:220px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column}\n.qh{padding:20px 18px 15px;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--d1);border-bottom:1px solid var(--ln)}\n.ql{flex:1;overflow-y:auto;padding:8px}\n.qi{padding:14px 16px;margin-bottom:2px;cursor:pointer;border-left:2px solid transparent;transition:all .12s}\n.qi:hover{background:var(--k3)}.qi.cur{border-left-color:var(--gl);background:var(--k2)}\n.qi-t{font-size:13px;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.qi-id{font-size:9.5px;color:var(--d2);margin-top:3px;font-family:monospace;letter-spacing:0}\n.qi-s{font-size:8.5px;color:var(--g);margin-top:3px;letter-spacing:.1em;text-transform:uppercase}\n.qi-year{font-family:var(--serif);font-size:13px;color:var(--gl)}\n.qi-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(--k3);margin-bottom:6px}\n.qi-thumb-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:16px;opacity:.15;margin-bottom:6px}\n.qadd{margin:7px;padding:8px;border:1px dashed var(--ln2);background:none;color:var(--d1);font-size:9.5px;font-family:var(--sans);letter-spacing:.12em;cursor:pointer;transition:all .15s;width:calc(100% - 14px)}\n.qadd:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.qadd:disabled{opacity:.22;cursor:not-allowed}\n.fp{flex:1;display:flex;flex-direction:column;background:var(--k1);overflow:hidden}\n.fh{display:flex;align-items:center;justify-content:space-between;padding:20px 30px;border-bottom:1px solid var(--ln);flex-shrink:0}\n.fh-title{font-family:var(--serif);font-size:22px;font-weight:300;color:var(--wh)}\n.fhr{display:flex;align-items:center;gap:13px}\n.sf{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--g);opacity:0;transition:opacity .4s}.sf.on{opacity:1}\n.xb{width:28px;height:28px;border:1px solid var(--ln2);background:none;color:var(--d1);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}.xb:hover{border-color:#c07070;color:#c07070}\n.fb{flex:1;overflow-y:auto;padding:26px 30px}\n.fg{display:flex;flex-direction:column;gap:5px}\n.fg label{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1)}\n.fg input,.fg textarea{background:var(--k2);border:1px solid var(--ln);border-top-color:var(--ln2);color:var(--tx);padding:10px 12px;font-family:var(--sans);font-size:14px;letter-spacing:.02em;outline:none;transition:border-color .15s;width:100%;height:38px}\n.fg input:focus,.fg textarea:focus{border-color:var(--g)}\n.fg input::placeholder,.fg textarea::placeholder{color:var(--d2)}\n.fg input[readonly]{opacity:.38;cursor:default;font-family:monospace;font-size:10px;letter-spacing:0}\n.fg textarea{resize:vertical;min-height:80px;height:auto}\n.fr{display:grid;gap:14px;margin-bottom:14px}\n.fr1{grid-template-columns:1fr}.fr2{grid-template-columns:1fr 1fr}.fr3{grid-template-columns:1fr 1fr 1fr}\n.gia-blk{background:var(--k2);border:1px solid var(--ln);padding:16px 18px;margin-bottom:14px}\n.gia-l{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1);margin-bottom:10px}\n.gia-mr{display:flex;gap:0;margin-bottom:10px}\n.gmb{padding:5px 13px;font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln);background:none;color:var(--d1);cursor:pointer;margin-right:-1px;transition:all .12s;font-family:var(--sans)}\n.gmb.on{background:var(--gbg);border-color:rgba(207,176,64,.35);color:var(--gl);z-index:1}\n.uz{border:1px dashed var(--ln2);padding:18px;text-align:center;cursor:pointer;transition:all .15s;background:var(--k1)}\n.uz:hover{border-color:var(--g)}.uz input{display:none}\n.uz p{font-size:9.5px;color:var(--d1);letter-spacing:.1em}\n.uz .ui{font-size:20px;opacity:.2;margin-bottom:5px}\n.ufn{font-size:9.5px;color:var(--g);margin-top:5px;word-break:break-all}\n.ff{display:flex;align-items:center;justify-content:space-between;padding:16px 30px;border-top:1px solid var(--ln);flex-shrink:0;background:var(--k1)}\n.ff-note{font-size:10.5px;color:var(--d2);letter-spacing:.07em}\n.ffa{display:flex;gap:7px}\n.bg{padding:10px 16px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s}\n.bg:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.bg:disabled{opacity:.4;cursor:not-allowed}\n.bg.arc:hover{border-color:var(--er);color:#c07070}\n.bn{padding:10px 16px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid rgba(207,176,64,.28);background:var(--gbg);color:var(--gl);cursor:pointer;transition:all .15s}\n.bn:hover{background:var(--gl);color:#000}\n.bp{padding:10px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:none;background:var(--gl);color:#000;cursor:pointer;transition:background .15s}\n.bp:hover:not(:disabled){background:#dcc056}.bp:disabled{opacity:.4;cursor:not-allowed}\n.photo-blk{background:var(--k2);border:1px solid var(--ln);padding:16px 18px;margin-bottom:14px}\n.photo-l{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1);margin-bottom:10px}\n.photo-mr{display:flex;gap:0;margin-bottom:10px}\n.photo-preview{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(--k3);margin-top:9px;border:1px solid var(--ln)}\n.photo-preview-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:32px;opacity:.08;margin-top:9px;border:1px solid var(--ln)}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}\n.card{position:relative;cursor:pointer;background:var(--k2);border:1px solid var(--ln)}.card:hover{border-color:var(--ln2)}\n.card.selected{border-color:rgba(207,176,64,.5);box-shadow:0 0 0 1px rgba(207,176,64,.2)}\n.card-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;background:var(--k3)}\n.card-thumb-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.1}\n.card-meta{padding:12px 14px;border-top:1px solid var(--ln)}\n.card-year{font-family:var(--serif);font-size:17px;font-weight:400;color:var(--gl);letter-spacing:.04em;line-height:1.2}\n.card-year.empty{color:var(--d2);font-style:italic;font-size:13px}\n.card-caption{font-size:13px;color:var(--d2);letter-spacing:.04em;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.sort-badge{position:absolute;top:7px;left:7px;background:rgba(0,0,0,0.72);padding:3px 7px;font-size:10px;font-family:monospace;color:var(--d1);cursor:text;min-width:22px;text-align:center;transition:color .15s}\n.sort-badge:hover{color:var(--gl)}\n.sort-input{position:absolute;top:7px;left:7px;width:42px;background:rgba(0,0,0,0.92);border:1px solid var(--gl);color:var(--gl);font-size:10px;font-family:monospace;padding:2px 6px;outline:none;text-align:center}\n.pub-dot{position:absolute;top:10px;right:10px;width:7px;height:7px;border-radius:50%}\n.pub-dot.live{background:var(--gl);box-shadow:0 0 6px rgba(207,176,64,.5)}\n.pub-dot.draft{background:rgba(255,255,255,.18)}\n.card-check{position:absolute;top:8px;left:8px;width:16px;height:16px;accent-color:var(--gl);cursor:pointer}\n.card-ra{position:absolute;bottom:52px;right:8px;display:flex;gap:5px;opacity:0;transition:opacity .15s}\n.card:hover .card-ra{opacity:1}\n.bulk-bar{display:flex;align-items:center;gap:10px;padding:10px 32px;background:var(--k2);border-bottom:1px solid var(--ln);flex-shrink:0}\n.bulk-count{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--gl);margin-right:6px}\n.bb{padding:6px 12px;font-family:var(--sans);font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s}\n.bb:hover{border-color:var(--g);color:var(--gl)}\n.bb.pub{border-color:rgba(207,176,64,.25);color:var(--g)}.bb.pub:hover{background:var(--gbg)}\n.bb.arc:hover{border-color:var(--er);color:#c07070}\n.stat-card{background:var(--k1);border:1px solid var(--ln);padding:28px;min-height:100px}\n.stat-val{font-family:var(--serif);font-size:32px;color:var(--gl);letter-spacing:.03em}\n.stat-label{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-top:6px}\n.notif-row{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--ln);cursor:pointer;transition:background .1s}\n.notif-row:hover{background:var(--k2)}\n.notif-dot{width:7px;height:7px;border-radius:50%;background:var(--gl);flex-shrink:0}\n.notif-icon{font-size:16px;opacity:.5;flex-shrink:0;width:22px;text-align:center}\n.notif-body{flex:1;min-width:0}\n.notif-msg{font-size:14px;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.notif-meta{font-size:11px;color:var(--d1);margin-top:3px}\n.notif-time{font-size:10px;color:var(--d2);flex-shrink:0}\n::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--ln2)}\n\n/* ── Mobile Top Bar + Hamburger ── */\n.mob-topbar{display:none}\n.mob-dropdown{display:none}\n\n@media(max-width:767px){\n  .sb{display:none!important}\n  .shell{flex-direction:column}\n  .main{margin-left:0}\n\n  .mob-topbar{\n    display:flex;align-items:center;justify-content:space-between;\n    position:fixed;top:0;left:0;right:0;z-index:90;\n    height:52px;padding:0 16px;\n    background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.06)\n  }\n  .mob-brand{font-family:var(--serif);font-size:15px;color:#d4af37;letter-spacing:.05em}\n  .mob-burger{\n    display:flex;flex-direction:column;justify-content:center;gap:5px;\n    width:28px;height:28px;background:none;cursor:pointer;padding:5px;\n    border:0.5px solid rgba(255,255,255,0.15);transition:border-color .2s\n  }\n  .mob-burger:hover{border-color:rgba(212,175,55,0.5)}\n  .mob-burger .mb{width:100%;height:1px;background:rgba(255,255,255,0.7);transition:all .25s ease;transform-origin:center}\n  .mob-burger.open .mb:nth-child(1){transform:translateY(6px) rotate(45deg)}\n  .mob-burger.open .mb:nth-child(2){opacity:0;transform:scaleX(0)}\n  .mob-burger.open .mb:nth-child(3){transform:translateY(-6px) rotate(-45deg)}\n\n  .mob-dropdown{\n    position:fixed;top:52px;left:0;right:0;z-index:89;\n    background:rgba(8,8,8,0.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);\n    border-bottom:1px solid rgba(255,255,255,0.06);\n    flex-direction:column;\n    transform:translateY(-8px);opacity:0;pointer-events:none;\n    transition:opacity .22s ease,transform .22s ease\n  }\n  .mob-dropdown.open{display:flex;opacity:1;transform:translateY(0);pointer-events:auto}\n  .mob-dropdown-item{\n    display:block;\n    font-family:var(--sans);font-size:11px;font-weight:500;\n    letter-spacing:.22em;text-transform:uppercase;\n    color:rgba(255,255,255,0.55);text-decoration:none;\n    padding:15px 20px;\n    border-bottom:1px solid rgba(255,255,255,0.05);\n    transition:color .15s;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;\n    width:100%;text-align:left\n  }\n  .mob-dropdown-item:last-child{border-bottom:none}\n  .mob-dropdown-item:hover{color:#fff}\n  .mob-dropdown-item.on{color:#d4af37}\n  .mob-dropdown-signout{\n    display:block;width:100%;text-align:left;\n    font-family:var(--sans);font-size:10px;font-weight:400;\n    letter-spacing:.18em;text-transform:uppercase;\n    color:var(--d2);background:none;border:none;\n    padding:14px 20px;cursor:pointer;transition:color .15s;\n    border-top:1px solid rgba(255,255,255,0.05)\n  }\n  .mob-dropdown-signout:hover{color:var(--er)}\n\n  .main{padding-top:52px;height:calc(100vh - 0px)}\n  .ph{padding:16px 16px}\n  .tabs{padding:0 16px;overflow-x:auto;flex-wrap:nowrap;white-space:nowrap}\n  .pb{padding:0 16px}\n\n  /* Form overlay: full screen, no queue panel */\n  .ov{flex-direction:column}\n  .qp{display:none}\n  .fp{width:100%}\n  .fh{padding:14px 16px}\n  .fb{padding:16px}\n  .ff{padding:12px 16px}\n  .fr2,.fr3{grid-template-columns:1fr}\n\n  /* Card grid: single column */\n  .grid{grid-template-columns:1fr}\n\n  /* Table: horizontal scroll */\n  .tbl{display:block;overflow-x:auto}\n  .ra{opacity:1}\n\n  /* Dashboard: stack columns */\n  .dash-grid{grid-template-columns:1fr!important}\n}\n";
function AdminLayout(param) {
    var _this = this;
    var children = param.children, activeNav = param.activeNav;
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), checking = _useState[0], setChecking = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), bellCount = _useState1[0], setBellCount = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), mobileMenuOpen = _useState2[0], setMobileMenuOpen = _useState2[1];
    var menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auth guard
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": function() {
            var check = function check() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "AdminLayout.useEffect.check": function() {
                        var _ref, session, _ref1, adminCheck;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "AdminLayout.useEffect.check": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession()
                                        ];
                                    case 1:
                                        _ref = _state.sent(), session = _ref.data.session;
                                        if (!session) {
                                            router.replace('/admin/login');
                                            return [
                                                2
                                            ];
                                        }
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', session.user.id).single()
                                        ];
                                    case 2:
                                        _ref1 = _state.sent(), adminCheck = _ref1.data;
                                        if (!!adminCheck) return [
                                            3,
                                            4
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                                        ];
                                    case 3:
                                        _state.sent();
                                        router.replace('/admin/login');
                                        return [
                                            2
                                        ];
                                    case 4:
                                        setChecking(false);
                                        // Load unread notification count (stubbed — will be wired later)
                                        // TODO: Wire notification bell count from admin_notifications
                                        setBellCount(0);
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["AdminLayout.useEffect.check"]);
                    }
                }["AdminLayout.useEffect.check"])();
            };
            check();
        }
    }["AdminLayout.useEffect"], [
        router
    ]);
    // Close mobile menu on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": function() {
            if (!mobileMenuOpen) return;
            var close = {
                "AdminLayout.useEffect.close": function(e) {
                    if (menuRef.current && !menuRef.current.contains(e.target)) {
                        setMobileMenuOpen(false);
                    }
                }
            }["AdminLayout.useEffect.close"];
            document.addEventListener('click', close);
            return ({
                "AdminLayout.useEffect": function() {
                    return document.removeEventListener('click', close);
                }
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], [
        mobileMenuOpen
    ]);
    var handleSignOut = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                        ];
                    case 1:
                        _state.sent();
                        router.push('/admin/login');
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var handleMobileNav = function(route) {
        setMobileMenuOpen(false);
        router.push(route);
    };
    if (checking) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#060606',
            height: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminLayout.tsx",
        lineNumber: 314,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: adminCss
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mob-topbar",
                ref: menuRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mob-brand",
                        children: "CCG"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "mob-burger".concat(mobileMenuOpen ? ' open' : ''),
                        onClick: function(e) {
                            e.stopPropagation();
                            setMobileMenuOpen(function(p) {
                                return !p;
                            });
                        },
                        "aria-label": "Toggle admin menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mob-dropdown".concat(mobileMenuOpen ? ' open' : ''),
                children: [
                    NAV_ITEMS.map(function(item) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "mob-dropdown-item".concat(activeNav === item.id ? ' on' : ''),
                            onClick: function() {
                                return handleMobileNav(item.route);
                            },
                            children: item.label
                        }, item.id, false, {
                            fileName: "[project]/components/admin/AdminLayout.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, _this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "mob-dropdown-signout",
                        onClick: handleSignOut,
                        children: "Sign Out"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sb",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sb-brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sb-name",
                                        children: [
                                            "Cutting Corners",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 352,
                                                columnNumber: 53
                                            }, this),
                                            "Gems"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sb-role",
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "sb-nav",
                                children: NAV_ITEMS.map(function(item) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ni ".concat(activeNav === item.id ? 'on' : ''),
                                        onClick: function() {
                                            return router.push(item.route);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ni-ic",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, _this),
                                            item.label,
                                            item.id === 'dashboard' && bellCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ni-bell",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ni-badge",
                                                    children: bellCount > 9 ? '9+' : bellCount
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AdminLayout.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 21
                                                }, _this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sb-foot",
                                onClick: handleSignOut,
                                children: "Sign Out"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "main",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AdminLayout, "Zd4XlWpGUHe2usDwYXOgNEliypc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "fmtDate",
    ()=>fmtDate,
    "fmtTime",
    ()=>fmtTime,
    "formatMoney",
    ()=>formatMoney,
    "relativeTime",
    ()=>relativeTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatMoney(value) {
    if (value == null || isNaN(Number(value))) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(value));
}
function fmtDate(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function fmtTime(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function relativeTime(timestamp) {
    if (!timestamp) return '';
    var now = Date.now();
    var then = new Date(timestamp).getTime();
    var diff = now - then;
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    if (seconds < 60) return 'just now';
    if (minutes < 60) return "".concat(minutes, "m ago");
    if (hours < 24) return "".concat(hours, "h ago");
    if (days < 7) return "".concat(days, "d ago");
    return fmtDate(timestamp);
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/users/ChatWidget.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ChatWidget(param) {
    var _this = this;
    var chatThread = param.chatThread, messages = param.messages, setMessages = param.setMessages, user = param.user, id = param.id, session = param.session;
    _s();
    // Const block — lines 33–38 of [id].tsx
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), chatInput = _useState[0], setChatInput = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatSending = _useState1[0], setChatSending = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatExpanded = _useState2[0], setChatExpanded = _useState2[1];
    var chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var chatFileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatUploading = _useState3[0], setChatUploading = _useState3[1];
    // Scroll effect — line 130 of [id].tsx
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": function() {
            var _chatEndRef_current;
            (_chatEndRef_current = chatEndRef.current) === null || _chatEndRef_current === void 0 ? void 0 : _chatEndRef_current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatWidget.useEffect"], [
        messages,
        chatExpanded
    ]);
    // Mark chat read on expand — lines 275–280 of [id].tsx
    var expandChat = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setChatExpanded(true);
                        if (!chatThread) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                admin_has_unread: false
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 1:
                        _state.sent();
                        _state.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Send chat (admin) — lines 230–272 of [id].tsx
    var sendChat = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var msgText, optimisticMsg, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!chatInput.trim() || !chatThread || !session) return [
                            2
                        ];
                        msgText = chatInput;
                        setChatInput('');
                        setChatSending(true);
                        // Optimistic update
                        optimisticMsg = {
                            chat_message_id: 'opt-' + Date.now(),
                            chat_thread_id: chatThread.chat_thread_id,
                            actor: 'ADMIN',
                            actor_id: session.user.id,
                            body: msgText,
                            attachment_url: null,
                            attachment_type: null,
                            created_at: new Date().toISOString()
                        };
                        setMessages(function(prev) {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
                                optimisticMsg
                            ]);
                        });
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
                                chat_thread_id: chatThread.chat_thread_id,
                                actor: 'ADMIN',
                                actor_id: session.user.id,
                                body: msgText,
                                attachment_url: null,
                                attachment_type: null
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Chat insert failed:', error.message);
                            setMessages(function(prev) {
                                return prev.filter(function(m) {
                                    return m.chat_message_id !== optimisticMsg.chat_message_id;
                                });
                            });
                            setChatInput(msgText);
                            setChatSending(false);
                            return [
                                2
                            ];
                        }
                        // This is the ONLY place send-user-notification is called manually
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
                                body: {
                                    event_type: 'chat',
                                    user_id: id
                                }
                            }).catch(function() {})
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                admin_has_unread: false,
                                account_has_unread: true
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 3:
                        _state.sent();
                        setChatSending(false);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Chat file upload (admin) — lines 283–303 of [id].tsx
    var handleChatFile = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _e_target_files, file, path, _ref, uploadData, uploadErr, uploadedUrl, uploadedType;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                        if (!file || !chatThread || !session) return [
                            2
                        ];
                        setChatUploading(true);
                        path = "admin/".concat(Date.now(), "_").concat(file.name);
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').upload(path, file, {
                                contentType: file.type
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), uploadData = _ref.data, uploadErr = _ref.error;
                        if (uploadErr) {
                            console.error('Upload error:', uploadErr.message);
                            setChatUploading(false);
                            return [
                                2
                            ];
                        }
                        uploadedUrl = (uploadData === null || uploadData === void 0 ? void 0 : uploadData.path) || path;
                        uploadedType = file.type;
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
                                chat_thread_id: chatThread.chat_thread_id,
                                actor: 'ADMIN',
                                actor_id: session.user.id,
                                body: null,
                                attachment_url: uploadedUrl,
                                attachment_type: uploadedType
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
                                body: {
                                    event_type: 'chat',
                                    user_id: id
                                }
                            }).catch(function() {})
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                admin_has_unread: false,
                                account_has_unread: true
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 4:
                        _state.sent();
                        setChatUploading(false);
                        if (chatFileRef.current) chatFileRef.current.value = '';
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // JSX block — lines 489–529 of [id].tsx (the <div> inside the chatThread && !isGuest conditional)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '479px',
            zIndex: 100
        },
        children: !chatExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: expandChat,
            style: {
                height: '79px',
                background: 'var(--k1)',
                borderTop: '1px solid var(--ln)',
                border: '1px solid var(--ln)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 21px',
                cursor: 'pointer'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: 'var(--sans)',
                        fontSize: '15px',
                        letterSpacing: '.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gl)'
                    },
                    children: [
                        "Chat · ",
                        (user === null || user === void 0 ? void 0 : user.name) || 'User'
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: 'var(--d1)',
                        fontSize: '17px'
                    },
                    children: "↑"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 108,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/ChatWidget.tsx",
            lineNumber: 106,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: '799px',
                background: 'var(--k1)',
                borderTop: '1px solid var(--ln)',
                border: '1px solid var(--ln)',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 21px',
                        borderBottom: '1px solid var(--ln)',
                        flexShrink: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '17px',
                                letterSpacing: '.15em',
                                textTransform: 'uppercase',
                                color: 'var(--gl)'
                            },
                            children: [
                                "Chat · ",
                                (user === null || user === void 0 ? void 0 : user.name) || 'User'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                return setChatExpanded(false);
                            },
                            style: {
                                background: 'none',
                                border: 'none',
                                color: 'var(--d1)',
                                cursor: 'pointer',
                                fontSize: '19px'
                            },
                            children: "↓"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        overflowY: 'auto',
                        padding: '13px 21px'
                    },
                    children: [
                        messages.map(function(m) {
                            var _m_attachment_type;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: m.actor === 'ADMIN' ? 'flex-end' : 'flex-start',
                                    marginBottom: '11px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            maxWidth: '70%',
                                            padding: '11px 15px',
                                            borderRadius: '11px',
                                            background: m.actor === 'ADMIN' ? '#d4af37' : 'rgba(45,212,191,1)',
                                            color: '#050505',
                                            fontFamily: "'Comfortaa', sans-serif",
                                            fontSize: '15px'
                                        },
                                        children: [
                                            m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: m.body
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 120,
                                                columnNumber: 30
                                            }, _this),
                                            m.attachment_url && ((_m_attachment_type = m.attachment_type) === null || _m_attachment_type === void 0 ? void 0 : _m_attachment_type.startsWith('image/')) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                alt: "attachment",
                                                style: {
                                                    maxWidth: '200px',
                                                    maxHeight: '200px',
                                                    objectFit: 'cover',
                                                    marginTop: m.body ? '6px' : '0',
                                                    borderRadius: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, _this),
                                            m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: m.body ? '7px' : '0',
                                                    fontSize: '17px'
                                                },
                                                children: [
                                                    "📄 ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        style: {
                                                            color: '#050505',
                                                            textDecoration: 'underline'
                                                        },
                                                        children: "Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 91
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'var(--d2)',
                                            marginTop: '5px'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, m.chat_message_id, true, {
                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, _this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: chatEndRef
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px',
                        padding: '13px 21px',
                        borderTop: '.5px solid var(--ln)',
                        flexShrink: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            ref: chatFileRef,
                            accept: ".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf",
                            style: {
                                display: 'none'
                            },
                            onChange: handleChatFile
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                var _chatFileRef_current;
                                return (_chatFileRef_current = chatFileRef.current) === null || _chatFileRef_current === void 0 ? void 0 : _chatFileRef_current.click();
                            },
                            disabled: chatUploading,
                            style: {
                                background: 'none',
                                border: '1px solid var(--ln)',
                                color: 'var(--d1)',
                                padding: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                flexShrink: 0
                            },
                            title: "Attach file",
                            children: chatUploading ? '...' : '📎'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: chatInput,
                            onChange: function(e) {
                                return setChatInput(e.target.value);
                            },
                            placeholder: "Type a message...",
                            style: {
                                flex: 1,
                                background: 'var(--k2)',
                                border: '1px solid var(--ln)',
                                padding: '11px 13px',
                                color: 'var(--tx)',
                                fontFamily: 'var(--sans)',
                                fontSize: '15px',
                                outline: 'none',
                                height: '44px'
                            },
                            onKeyDown: function(e) {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendChat();
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: sendChat,
                            disabled: chatSending || !chatInput.trim(),
                            style: {
                                background: 'var(--gl)',
                                border: 'none',
                                color: '#000',
                                padding: '11px 17px',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '16px'
                            },
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/ChatWidget.tsx",
            lineNumber: 111,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/ChatWidget.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(ChatWidget, "CsRR1zEsHZoxi26rZG7LA09S76o=");
_c = ChatWidget;
var _c;
__turbopack_context__.k.register(_c, "ChatWidget");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/users/AddWorkOrderModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddWorkOrderModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
function AddWorkOrderModal(param) {
    var _this = this;
    var showAddWO = param.showAddWO, setShowAddWO = param.setShowAddWO, user = param.user, id = param.id, session = param.session, setWO = param.setWO, setWoCount = param.setWoCount;
    _s();
    // Const block — lines 50–51 of [id].tsx
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        description: '',
        service_type: '',
        gem_type: '',
        estimated_price: '',
        estimated_turnaround: '',
        notes: ''
    }), 2), woForm = _useState[0], setWoForm = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), woSaving = _useState1[0], setWoSaving = _useState1[1];
    // inputStyle — line 320 of [id].tsx
    var inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // Create work order — lines 156–178 of [id].tsx
    var createWO = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _ref, wo;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!woForm.title || !woForm.description || !session || !id) return [
                            2
                        ];
                        setWoSaving(true);
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').insert({
                                account_user_id: id,
                                created_by_admin_id: session.user.id,
                                title: woForm.title,
                                description: woForm.description,
                                service_type: woForm.service_type || null,
                                gem_type: woForm.gem_type || null,
                                estimated_price: woForm.estimated_price ? parseFloat(woForm.estimated_price) : null,
                                estimated_turnaround: woForm.estimated_turnaround || null,
                                notes: woForm.notes || null,
                                wo_shipping_address: (user === null || user === void 0 ? void 0 : user.shipping_address) || null,
                                edit_history: [
                                    {
                                        action: 'CREATED',
                                        by: 'admin',
                                        at: new Date().toISOString()
                                    }
                                ],
                                status: 'CREATED'
                            })
                        ];
                    case 1:
                        _state.sent();
                        // DB triggers fire automatically — do NOT call edge functions
                        setWoSaving(false);
                        setShowAddWO(false);
                        setWoForm({
                            title: '',
                            description: '',
                            service_type: '',
                            gem_type: '',
                            estimated_price: '',
                            estimated_turnaround: '',
                            notes: ''
                        });
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', id).order('created_at', {
                                ascending: false
                            })
                        ];
                    case 2:
                        _ref = _state.sent(), wo = _ref.data;
                        setWO(wo || []);
                        setWoCount((wo === null || wo === void 0 ? void 0 : wo.length) || 0);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // JSX block — lines 534–586 of [id].tsx
    if (!showAddWO) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: function(e) {
            if (e.target === e.currentTarget) setShowAddWO(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '.5px solid var(--ln)',
                padding: '29px',
                maxWidth: '479px',
                width: '90%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: 'var(--serif)',
                        fontSize: '23px',
                        color: 'var(--wh)',
                        marginBottom: '21px'
                    },
                    children: "New Work Order"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 500,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Service Type"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: woForm.service_type,
                            onChange: function(e) {
                                return setWoForm((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, woForm), {
                                    service_type: e.target.value
                                }));
                            },
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, inputStyle), {
                                background: 'var(--k2)'
                            }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select service type"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                [
                                    'Custom Rough Cut',
                                    'Re-Cut & Re-Polish',
                                    'Table Re-Polish',
                                    'Crown Re-Polish',
                                    'Pavilion Re-Polish',
                                    'Gemstone Material Cut Design',
                                    'Virtual Consultation'
                                ].map(function(st) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: st,
                                        children: st
                                    }, st, false, {
                                        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, _this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Title *',
                        key: 'title',
                        placeholder: 'Work order title'
                    },
                    {
                        label: 'Gem Type',
                        key: 'gem_type',
                        placeholder: 'e.g. Sapphire'
                    },
                    {
                        label: 'Estimated Price ($)',
                        key: 'estimated_price',
                        placeholder: '0.00'
                    },
                    {
                        label: 'Estimated Turnaround',
                        key: 'estimated_turnaround',
                        placeholder: 'e.g. 2-3 weeks after receiving stone'
                    },
                    {
                        label: 'Notes',
                        key: 'notes',
                        placeholder: 'Internal notes'
                    }
                ].map(function(f) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '13px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    letterSpacing: '.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d1)',
                                    display: 'block',
                                    marginBottom: '5px'
                                },
                                children: f.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: woForm[f.key],
                                onChange: function(e) {
                                    return setWoForm((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, woForm), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, f.key, e.target.value)));
                                },
                                placeholder: f.placeholder,
                                style: inputStyle
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, _this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 500,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Description *"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: woForm.description,
                            onChange: function(e) {
                                return setWoForm((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, woForm), {
                                    description: e.target.value
                                }));
                            },
                            placeholder: "Work order description",
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, inputStyle), {
                                minHeight: '80px',
                                resize: 'vertical'
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                (user === null || user === void 0 ? void 0 : user.shipping_address) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px',
                        padding: '12px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '5px'
                            },
                            children: "Return Address (from user profile)"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--tx)'
                            },
                            children: user.shipping_address
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: createWO,
                            disabled: woSaving || !woForm.title || !woForm.description,
                            children: woSaving ? 'Creating...' : 'Create'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: function() {
                                return setShowAddWO(false);
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(AddWorkOrderModal, "P9HmUN4IMExTuj7PC2OpICszYPI=");
_c = AddWorkOrderModal;
var _c;
__turbopack_context__.k.register(_c, "AddWorkOrderModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/users/EditUserModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditUserModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
function EditUserModal(param) {
    var _this = this;
    var showEditUser = param.showEditUser, setShowEditUser = param.setShowEditUser, user = param.user, id = param.id, setUser = param.setUser;
    _s();
    // editUser state — lines 55 of [id].tsx (initialized from user, synced on open)
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, user) : null), 2), editUser = _useState[0], setEditUser = _useState[1];
    // Re-sync editUser each time the modal opens — mirrors line 352: setEditUser({ ...user })
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditUserModal.useEffect": function() {
            if (showEditUser && user) setEditUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, user));
        }
    }["EditUserModal.useEffect"], [
        showEditUser
    ]);
    // inputStyle — line 320 of [id].tsx
    var inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // Save user edit — lines 219–227 of [id].tsx
    var saveUser = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!editUser || !id) return [
                            2
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').update({
                                name: editUser.name,
                                email: editUser.email,
                                phone: editUser.phone,
                                shipping_address: editUser.shipping_address,
                                business_name: editUser.business_name,
                                status: editUser.status
                            }).eq('account_user_id', id)
                        ];
                    case 1:
                        _state.sent();
                        setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, editUser));
                        setShowEditUser(false);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // JSX block — lines 588–620 of [id].tsx
    if (!showEditUser || !editUser) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: function(e) {
            if (e.target === e.currentTarget) setShowEditUser(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '1px solid var(--ln)',
                padding: '29px',
                maxWidth: '480px',
                width: '90%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: 'var(--serif)',
                        fontSize: '23px',
                        color: 'var(--wh)',
                        marginBottom: '21px'
                    },
                    children: "Edit User"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Name',
                        key: 'name'
                    },
                    {
                        label: 'Email',
                        key: 'email'
                    },
                    {
                        label: 'Phone',
                        key: 'phone'
                    },
                    {
                        label: 'Business Name',
                        key: 'business_name'
                    }
                ].map(function(f) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '13px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    letterSpacing: '.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d1)',
                                    display: 'block',
                                    marginBottom: '5px'
                                },
                                children: f.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: editUser[f.key] || '',
                                onChange: function(e) {
                                    return setEditUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, editUser), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, f.key, e.target.value)));
                                },
                                style: inputStyle
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/components/admin/users/EditUserModal.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, _this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '15px',
                                fontWeight: 500,
                                letterSpacing: '.3em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Shipping Address"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: editUser.shipping_address || '',
                            onChange: function(e) {
                                return setEditUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, editUser), {
                                    shipping_address: e.target.value
                                }));
                            },
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, inputStyle), {
                                minHeight: '60px',
                                resize: 'vertical'
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '17px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '15px',
                                fontWeight: 500,
                                letterSpacing: '.3em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Status"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: editUser.status || 'ACTIVE',
                            onChange: function(e) {
                                return setEditUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, editUser), {
                                    status: e.target.value
                                }));
                            },
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, inputStyle), {
                                cursor: 'pointer'
                            }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "ACTIVE",
                                    children: "ACTIVE"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "SUSPENDED",
                                    children: "SUSPENDED"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: saveUser,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: function() {
                                return setShowEditUser(false);
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/EditUserModal.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/EditUserModal.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(EditUserModal, "e4pMN7hOVecQcKJtFo8SO0ecEyQ=");
_c = EditUserModal;
var _c;
__turbopack_context__.k.register(_c, "EditUserModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/users/InquiryDetailModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InquiryDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
function InquiryDetailModal(param) {
    var _this = this;
    var selectedInq = param.selectedInq, setSelectedInq = param.setSelectedInq, selectedInqProduct = param.selectedInqProduct, setSelectedInqProduct = param.setSelectedInqProduct, user = param.user;
    // JSX block — lines 622–698 of [id].tsx
    if (!selectedInq) return null;
    var onClose = function() {
        setSelectedInq(null);
        setSelectedInqProduct(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        },
        onClick: function(e) {
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.10)',
                padding: '31px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '2px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '6px'
                            },
                            children: selectedInq.guest_inquiry_id ? 'Guest Inquiry' : 'Account Inquiry'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--serif)',
                                fontSize: '22px',
                                color: 'var(--wh)'
                            },
                            children: selectedInq.name || (user === null || user === void 0 ? void 0 : user.name) || 'Inquiry'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        selectedInq.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--d1)',
                                marginTop: '3px'
                            },
                            children: selectedInq.email
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 30,
                            columnNumber: 33
                        }, this),
                        selectedInq.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: '#377da2',
                                marginTop: '2px'
                            },
                            children: selectedInq.phone
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 31,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '8px'
                            },
                            children: "Message"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'var(--tx)',
                                lineHeight: 1.7
                            },
                            children: selectedInq.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                selectedInqProduct ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '12px'
                            },
                            children: "Product Inquired About"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this),
                        selectedInqProduct.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '16px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                maxHeight: '220px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: selectedInqProduct.photo_url.startsWith('http') ? selectedInqProduct.photo_url : "".concat(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), "/storage/v1/object/public/product-photos/").concat(selectedInqProduct.photo_url),
                                alt: selectedInqProduct.title,
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 49,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--serif)',
                                fontSize: '20px',
                                color: 'var(--wh)',
                                marginBottom: '4px'
                            },
                            children: selectedInqProduct.title
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '18px',
                                color: 'rgba(45,212,191,1)',
                                marginBottom: '14px'
                            },
                            children: selectedInqProduct.total_price ? '$' + Number(selectedInqProduct.total_price).toLocaleString() : ''
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        [
                            {
                                label: 'Product ID',
                                val: selectedInqProduct.product_id
                            },
                            {
                                label: 'Gem Type',
                                val: selectedInqProduct.gem_type
                            },
                            {
                                label: 'Shape',
                                val: selectedInqProduct.shape
                            },
                            {
                                label: 'Weight',
                                val: selectedInqProduct.weight ? selectedInqProduct.weight + ' ct' : null
                            },
                            {
                                label: 'Color',
                                val: selectedInqProduct.color
                            },
                            {
                                label: 'Origin',
                                val: selectedInqProduct.origin
                            },
                            {
                                label: 'Treatment',
                                val: selectedInqProduct.treatment
                            },
                            {
                                label: 'GIA Report #',
                                val: selectedInqProduct.gia_report_number
                            },
                            {
                                label: 'Price / ct',
                                val: selectedInqProduct.price_per_carat ? '$' + Number(selectedInqProduct.price_per_carat).toLocaleString() : null
                            }
                        ].filter(function(r) {
                            return r.val;
                        }).map(function(r) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '7px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--sans)',
                                            fontSize: '10px',
                                            letterSpacing: '.18em',
                                            textTransform: 'uppercase',
                                            color: 'var(--d1)'
                                        },
                                        children: r.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '13px',
                                            color: 'var(--tx)',
                                            textAlign: 'right',
                                            maxWidth: '60%',
                                            wordBreak: 'break-all'
                                        },
                                        children: r.val
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, r.label, true, {
                                fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, _this);
                        }),
                        selectedInqProduct.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--d2)',
                                lineHeight: 1.7,
                                marginTop: '12px'
                            },
                            children: selectedInqProduct.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 76,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px',
                        color: 'var(--d2)',
                        fontStyle: 'italic'
                    },
                    children: "No product linked to this inquiry"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '20px 0 16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '11px',
                        color: 'var(--d2)'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedInq.created_at),
                        " · ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedInq.created_at)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        marginTop: '20px',
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.45)',
                        padding: '10px 20px',
                        fontFamily: 'var(--sans)',
                        fontSize: '10px',
                        letterSpacing: '.18em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    },
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = InquiryDetailModal;
var _c;
__turbopack_context__.k.register(_c, "InquiryDetailModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/users/WorkOrderDetailModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkOrderDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
// STATUS_COLORS — lines 7–13 of [id].tsx
var STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(184,154,42,0.08)',
        color: '#cfb040'
    },
    ACCEPTED: {
        bg: 'rgba(90,150,90,0.1)',
        color: '#7ec87e'
    },
    COMPLETED: {
        bg: 'rgba(80,120,200,0.1)',
        color: '#88aadd'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function WorkOrderDetailModal(param) {
    var _this = this;
    var selectedWO = param.selectedWO, setSelectedWO = param.setSelectedWO, user = param.user, session = param.session, adminInfo = param.adminInfo, setWO = param.setWO;
    var _STATUS_COLORS_selectedWO_status, _STATUS_COLORS_selectedWO_status1;
    _s();
    // Addr edit state — lines 42–44 of [id].tsx
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), editingWOAddr = _useState[0], setEditingWOAddr = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), woAdminAddrEdit = _useState1[0], setWoAdminAddrEdit = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), woClientAddrEdit = _useState2[0], setWoClientAddrEdit = _useState2[1];
    // inputStyle — line 320 of [id].tsx
    var inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // appendLog — lines 180–184 of [id].tsx
    var appendLog = function(wo, action, by) {
        var prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
            {
                action: action,
                by: by,
                at: new Date().toISOString()
            }
        ]);
    };
    // confirmWO — lines 186–196 of [id].tsx
    var confirmWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var log, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        log = appendLog(wo, 'CONFIRMED by admin', 'admin');
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'CONFIRMED',
                                confirmed_at: new Date().toISOString(),
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id)
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Confirm WO error:', error.message);
                            return [
                                2
                            ];
                        }
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
                                body: {
                                    event_type: 'work_order_confirmed',
                                    work_order_id: wo.work_order_id,
                                    user_id: wo.account_user_id
                                }
                            }).catch(function() {})
                        ];
                    case 2:
                        _state.sent();
                        setWO(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'CONFIRMED',
                                    confirmed_at: new Date().toISOString(),
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'CONFIRMED',
                                confirmed_at: new Date().toISOString(),
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // completeWO — lines 198–206 of [id].tsx
    var completeWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var log, now, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        log = appendLog(wo, 'COMPLETE by admin', 'admin');
                        now = new Date().toISOString();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'COMPLETE',
                                completed_at: now,
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id)
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Complete WO error:', error.message);
                            alert('Error: ' + error.message);
                            return [
                                2
                            ];
                        }
                        setWO(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'COMPLETE',
                                    completed_at: now,
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'COMPLETE',
                                completed_at: now,
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // cancelWO — lines 208–217 of [id].tsx
    var cancelWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var reason, log, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        reason = prompt('Cancel reason:');
                        if (!reason) return [
                            2
                        ];
                        log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'CANCELLED',
                                cancelled_at: new Date().toISOString(),
                                cancel_reason: reason,
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id)
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Cancel WO error:', error.message);
                            return [
                                2
                            ];
                        }
                        setWO(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'CANCELLED',
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'CANCELLED',
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // JSX block — lines 700–892 of [id].tsx
    if (!selectedWO) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: function(e) {
            if (e.target === e.currentTarget) setSelectedWO(null);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '.5px solid var(--ln)',
                padding: '40px',
                maxWidth: '720px',
                width: '95%',
                maxHeight: '92vh',
                overflowY: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '24px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        letterSpacing: '.3em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)',
                                        marginBottom: '4px'
                                    },
                                    children: "Work Order"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--serif)',
                                        fontSize: '22px',
                                        color: 'var(--wh)'
                                    },
                                    children: selectedWO.title
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '9px',
                                fontWeight: 500,
                                letterSpacing: '.17em',
                                textTransform: 'uppercase',
                                padding: '4px 9px',
                                background: (_STATUS_COLORS_selectedWO_status = STATUS_COLORS[selectedWO.status]) === null || _STATUS_COLORS_selectedWO_status === void 0 ? void 0 : _STATUS_COLORS_selectedWO_status.bg,
                                color: (_STATUS_COLORS_selectedWO_status1 = STATUS_COLORS[selectedWO.status]) === null || _STATUS_COLORS_selectedWO_status1 === void 0 ? void 0 : _STATUS_COLORS_selectedWO_status1.color
                            },
                            children: selectedWO.status
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '16px',
                        padding: '18px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        letterSpacing: '.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)'
                                    },
                                    children: "Admin Address"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '.15em',
                                        textTransform: 'uppercase',
                                        color: '#ffd700'
                                    },
                                    children: "← CLIENT SENDS ITEM HERE"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'var(--gl)',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    },
                                    children: adminInfo.business_name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.full_name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 600,
                                        color: 'rgba(255,255,255,0.85)'
                                    },
                                    children: adminInfo.address
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.contact_email
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this),
                user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        padding: '18px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        letterSpacing: '.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)'
                                    },
                                    children: "Client Return Address"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: '#ffd700'
                                            },
                                            children: "RETURN ITEM HERE →"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: function() {
                                                setEditingWOAddr(true);
                                                setWoClientAddrEdit(selectedWO.wo_shipping_address || user.shipping_address || '');
                                                setWoAdminAddrEdit((adminInfo === null || adminInfo === void 0 ? void 0 : adminInfo.address) || '');
                                            },
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.5)',
                                                padding: '3px 8px',
                                                cursor: 'pointer'
                                            },
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        editingWOAddr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: 'var(--d2)',
                                                display: 'block',
                                                marginBottom: '4px'
                                            },
                                            children: "Admin Address (send to)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: woAdminAddrEdit,
                                            onChange: function(e) {
                                                return setWoAdminAddrEdit(e.target.value);
                                            },
                                            style: {
                                                width: '100%',
                                                background: 'var(--k2)',
                                                border: '1px solid var(--ln)',
                                                color: 'var(--tx)',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                fontFamily: 'var(--sans)',
                                                outline: 'none',
                                                marginBottom: '8px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: 'var(--d2)',
                                                display: 'block',
                                                marginBottom: '4px'
                                            },
                                            children: "Client Return Address"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: woClientAddrEdit,
                                            onChange: function(e) {
                                                return setWoClientAddrEdit(e.target.value);
                                            },
                                            style: {
                                                width: '100%',
                                                background: 'var(--k2)',
                                                border: '1px solid var(--ln)',
                                                color: 'var(--tx)',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                fontFamily: 'var(--sans)',
                                                outline: 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bp",
                                            onClick: function() {
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                                                    var log, _session_user;
                                                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                                        switch(_state.label){
                                                            case 0:
                                                                log = appendLog(selectedWO, 'Addresses updated by admin', 'admin');
                                                                return [
                                                                    4,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                                        wo_shipping_address: woClientAddrEdit.trim(),
                                                                        edit_history: log
                                                                    }).eq('work_order_id', selectedWO.work_order_id)
                                                                ];
                                                            case 1:
                                                                _state.sent();
                                                                if (!(woAdminAddrEdit.trim() !== (adminInfo === null || adminInfo === void 0 ? void 0 : adminInfo.address))) return [
                                                                    3,
                                                                    3
                                                                ];
                                                                return [
                                                                    4,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').update({
                                                                        address: woAdminAddrEdit.trim()
                                                                    }).eq('admin_user_id', session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id)
                                                                ];
                                                            case 2:
                                                                _state.sent();
                                                                _state.label = 3;
                                                            case 3:
                                                                setSelectedWO(function(prev) {
                                                                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                                                        wo_shipping_address: woClientAddrEdit.trim(),
                                                                        edit_history: log
                                                                    });
                                                                });
                                                                setWO(function(prev) {
                                                                    return prev.map(function(w) {
                                                                        return w.work_order_id === selectedWO.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                                                            wo_shipping_address: woClientAddrEdit.trim()
                                                                        }) : w;
                                                                    });
                                                                });
                                                                setEditingWOAddr(false);
                                                                return [
                                                                    2
                                                                ];
                                                        }
                                                    });
                                                })();
                                            },
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg",
                                            onClick: function() {
                                                return setEditingWOAddr(false);
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'rgba(66,200,194,0.9)',
                                        fontSize: '16px'
                                    },
                                    children: user.name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this),
                                user.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: user.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 600,
                                        color: 'rgba(255,255,255,0.85)'
                                    },
                                    children: selectedWO.wo_shipping_address || user.shipping_address || 'No address on file'
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== user.shipping_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: '#ffd700',
                                        marginTop: '4px',
                                        fontStyle: 'italic'
                                    },
                                    children: "* Custom address for this work order only"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 150,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '14px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Service Type',
                        val: selectedWO.service_type
                    },
                    {
                        label: 'Gem Type',
                        val: selectedWO.gem_type
                    },
                    {
                        label: 'Est. Turnaround',
                        val: selectedWO.estimated_turnaround
                    },
                    {
                        label: 'Created',
                        val: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.created_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.created_at)
                    },
                    {
                        label: 'Accepted',
                        val: selectedWO.accepted_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.accepted_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.accepted_at) : null
                    },
                    {
                        label: 'Confirmed',
                        val: selectedWO.confirmed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.confirmed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.confirmed_at) : null
                    },
                    {
                        label: 'Completed',
                        val: selectedWO.completed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.completed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.completed_at) : null
                    },
                    {
                        label: 'Cancelled',
                        val: selectedWO.cancelled_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.cancelled_at) : null
                    }
                ].filter(function(r) {
                    return r.val;
                }).map(function(r) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px',
                                    letterSpacing: '.17em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d2)'
                                },
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '15px',
                                    color: 'rgba(255,255,255,0.72)'
                                },
                                children: r.val
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, r.label, true, {
                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, _this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.1em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '8px'
                            },
                            children: "Description"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                selectedWO.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.18em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '8px'
                            },
                            children: "Internal Notes"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.60)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.notes
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this),
                selectedWO.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '19px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '14px',
                        background: 'var(--k0)',
                        border: '1px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.18em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)'
                            },
                            children: "Quoted Price"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '22px',
                                color: 'rgb(34, 158, 114)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(selectedWO.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '16px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '12px'
                            },
                            children: "Payment"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this),
                        selectedWO.paid_outside_site ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: '#7ec87e'
                            },
                            children: "✓ Marked as paid outside site"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 200,
                            columnNumber: 15
                        }, this) : selectedWO.stripe_payment_link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: 'var(--d2)',
                                        marginBottom: '6px'
                                    },
                                    children: "Stripe payment link:"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: selectedWO.stripe_payment_link,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: 'var(--gl)',
                                        fontSize: '13px',
                                        wordBreak: 'break-all'
                                    },
                                    children: selectedWO.stripe_payment_link
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 204,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 202,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: '200px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "Paste Stripe payment link...",
                                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, inputStyle), {
                                            marginBottom: '8px'
                                        }),
                                        onBlur: function(e) {
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                                                var log;
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                                    switch(_state.label){
                                                        case 0:
                                                            if (!e.target.value.trim()) return [
                                                                3,
                                                                2
                                                            ];
                                                            log = appendLog(selectedWO, 'Payment link added', 'admin');
                                                            return [
                                                                4,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                                    stripe_payment_link: e.target.value.trim(),
                                                                    edit_history: log
                                                                }).eq('work_order_id', selectedWO.work_order_id)
                                                            ];
                                                        case 1:
                                                            _state.sent();
                                                            setSelectedWO(function(prev) {
                                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                                                    stripe_payment_link: e.target.value.trim(),
                                                                    edit_history: log
                                                                });
                                                            });
                                                            setWO(function(prev) {
                                                                return prev.map(function(w) {
                                                                    return w.work_order_id === selectedWO.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                                                        stripe_payment_link: e.target.value.trim()
                                                                    }) : w;
                                                                });
                                                            });
                                                            _state.label = 2;
                                                        case 2:
                                                            return [
                                                                2
                                                            ];
                                                    }
                                                });
                                            })();
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 209,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg",
                                    style: {
                                        whiteSpace: 'nowrap'
                                    },
                                    onClick: function() {
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                                            var log;
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                                switch(_state.label){
                                                    case 0:
                                                        log = appendLog(selectedWO, 'Marked as paid outside site', 'admin');
                                                        return [
                                                            4,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                                paid_outside_site: true,
                                                                edit_history: log
                                                            }).eq('work_order_id', selectedWO.work_order_id)
                                                        ];
                                                    case 1:
                                                        _state.sent();
                                                        setSelectedWO(function(prev) {
                                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                                                paid_outside_site: true,
                                                                edit_history: log
                                                            });
                                                        });
                                                        setWO(function(prev) {
                                                            return prev.map(function(w) {
                                                                return w.work_order_id === selectedWO.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                                                    paid_outside_site: true
                                                                }) : w;
                                                            });
                                                        });
                                                        return [
                                                            2
                                                        ];
                                                }
                                            });
                                        })();
                                    },
                                    children: "Paid Outside Site"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 207,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '7px',
                        marginTop: '25px',
                        flexWrap: 'wrap'
                    },
                    children: [
                        selectedWO.status === 'ACCEPTED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: function() {
                                return confirmWO(selectedWO);
                            },
                            children: "Confirm Order"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        selectedWO.status === 'CONFIRMED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: function() {
                                return completeWO(selectedWO);
                            },
                            children: "Mark Complete"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this),
                        (selectedWO.status === 'CREATED' || selectedWO.status === 'ACCEPTED' || selectedWO.status === 'CONFIRMED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg arc",
                            onClick: function() {
                                cancelWO(selectedWO);
                            },
                            children: "Cancel Order"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: function() {
                                return setSelectedWO(null);
                            },
                            style: {
                                marginLeft: 'auto'
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this),
                selectedWO.edit_history && selectedWO.edit_history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '28px',
                        borderTop: '1px solid var(--ln)',
                        paddingTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '10px'
                            },
                            children: "Activity Log"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(selectedWO.edit_history).reverse().map(function(entry, i) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    padding: '8px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                    gap: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    letterSpacing: '.15em',
                                                    textTransform: 'uppercase',
                                                    padding: '2px 6px',
                                                    background: entry.by === 'admin' ? 'rgba(212,175,55,0.12)' : 'rgba(45,212,191,0.1)',
                                                    color: entry.by === 'admin' ? '#cfb040' : 'rgba(45,212,191,0.9)'
                                                },
                                                children: entry.by
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '13px',
                                                    color: 'var(--tx)'
                                                },
                                                children: entry.action
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'var(--d2)',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(entry.at),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(entry.at)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, _this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(WorkOrderDetailModal, "nkOEnS6/OFlrGDyhFWDgi/nmObs=");
_c = WorkOrderDetailModal;
var _c;
__turbopack_context__.k.register(_c, "WorkOrderDetailModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/admin/users/[id].tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUserDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AdminLayout.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/ChatWidget.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/AddWorkOrderModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/EditUserModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/InquiryDetailModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/WorkOrderDetailModal.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
var STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(184,154,42,0.08)',
        color: '#cfb040'
    },
    ACCEPTED: {
        bg: 'rgba(90,150,90,0.1)',
        color: '#7ec87e'
    },
    COMPLETED: {
        bg: 'rgba(80,120,200,0.1)',
        color: '#88aadd'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function AdminUserDetail() {
    var _this = this;
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var id = router.query.id;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), session = _useState[0], setSession = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), checking = _useState1[0], setChecking = _useState1[1];
    // Data
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), user = _useState2[0], setUser = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), adminInfo = _useState3[0], setAdminInfo = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('dashboard'), 2), activeTab = _useState4[0], setActiveTab = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), inquiries = _useState5[0], setInquiries = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), serviceRequests = _useState6[0], setSR = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), workOrders = _useState7[0], setWO = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), invoices = _useState8[0], setInvoices = _useState8[1];
    // Chat
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), chatThread = _useState9[0], setChatThread = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), messages = _useState10[0], setMessages = _useState10[1];
    // Work order detail modal
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedWO = _useState11[0], setSelectedWO = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedInq = _useState12[0], setSelectedInq = _useState12[1];
    var _useState13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedInqProduct = _useState13[0], setSelectedInqProduct = _useState13[1];
    var _useState14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showAddWO = _useState14[0], setShowAddWO = _useState14[1];
    // Edit user
    var _useState15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showEditUser = _useState15[0], setShowEditUser = _useState15[1];
    // Stats
    var _useState16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), woCount = _useState16[0], setWoCount = _useState16[1];
    var _useState17 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), invTotal = _useState17[0], setInvTotal = _useState17[1];
    var _useState18 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), inqCount = _useState18[0], setInqCount = _useState18[1];
    var _useState19 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), srCount = _useState19[0], setSrCount = _useState19[1];
    var _useState20 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), guestInquiries = _useState20[0], setGuestInquiries = _useState20[1];
    // Auth guard
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUserDetail.useEffect": function() {
            var check = function check() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "AdminUserDetail.useEffect.check": function() {
                        var _ref, _ref_data, s, _ref1, adminCheck;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "AdminUserDetail.useEffect.check": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession()
                                        ];
                                    case 1:
                                        _ref = _state.sent(), _ref_data = _ref.data, s = _ref_data.session;
                                        if (!s) {
                                            router.replace('/admin/login');
                                            return [
                                                2
                                            ];
                                        }
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single()
                                        ];
                                    case 2:
                                        _ref1 = _state.sent(), adminCheck = _ref1.data;
                                        if (!!adminCheck) return [
                                            3,
                                            4
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                                        ];
                                    case 3:
                                        _state.sent();
                                        router.replace('/admin/login');
                                        return [
                                            2
                                        ];
                                    case 4:
                                        setSession(s);
                                        setChecking(false);
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["AdminUserDetail.useEffect.check"]);
                    }
                }["AdminUserDetail.useEffect.check"])();
            };
            check();
        }
    }["AdminUserDetail.useEffect"], [
        router
    ]);
    // Load all data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUserDetail.useEffect": function() {
            var loadAll = function loadAll() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "AdminUserDetail.useEffect.loadAll": function() {
                        var uid, _ref, u, _ref1, admin, _ref2, inq, guestId, _ref3, gInq, _ref4, sr, _ref5, wo, _ref6, inv, _ref7, thread, _ref8, msgs;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "AdminUserDetail.useEffect.loadAll": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        uid = id;
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', uid).single()
                                        ];
                                    case 1:
                                        _ref = _state.sent(), u = _ref.data;
                                        setUser(u);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('*').single()
                                        ];
                                    case 2:
                                        _ref1 = _state.sent(), admin = _ref1.data;
                                        setAdminInfo(admin);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 3:
                                        _ref2 = _state.sent(), inq = _ref2.data;
                                        setInquiries(inq || []);
                                        setInqCount((inq === null || inq === void 0 ? void 0 : inq.length) || 0);
                                        guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
                                        if (!(uid === guestId)) return [
                                            3,
                                            5
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('guest_inquiries').select('*').order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 4:
                                        _ref3 = _state.sent(), gInq = _ref3.data;
                                        setGuestInquiries(gInq || []);
                                        setInqCount(((gInq === null || gInq === void 0 ? void 0 : gInq.length) || 0) + ((inq === null || inq === void 0 ? void 0 : inq.length) || 0));
                                        _state.label = 5;
                                    case 5:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 6:
                                        _ref4 = _state.sent(), sr = _ref4.data;
                                        setSR(sr || []);
                                        setSrCount((sr === null || sr === void 0 ? void 0 : sr.length) || 0);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 7:
                                        _ref5 = _state.sent(), wo = _ref5.data;
                                        setWO(wo || []);
                                        setWoCount((wo === null || wo === void 0 ? void 0 : wo.length) || 0);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('*').eq('account_user_id', uid).order('paid_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 8:
                                        _ref6 = _state.sent(), inv = _ref6.data;
                                        setInvoices(inv || []);
                                        setInvTotal((inv === null || inv === void 0 ? void 0 : inv.reduce({
                                            "AdminUserDetail.useEffect.loadAll": function(s, i) {
                                                return s + Number(i.total_amount || 0);
                                            }
                                        }["AdminUserDetail.useEffect.loadAll"], 0)) || 0);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').select('*').eq('account_user_id', uid).single()
                                        ];
                                    case 9:
                                        _ref7 = _state.sent(), thread = _ref7.data;
                                        setChatThread(thread);
                                        if (!thread) return [
                                            3,
                                            11
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').select('*').eq('chat_thread_id', thread.chat_thread_id).order('created_at', {
                                                ascending: true
                                            })
                                        ];
                                    case 10:
                                        _ref8 = _state.sent(), msgs = _ref8.data;
                                        setMessages(msgs || []);
                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].channel('admin-chat-' + thread.chat_thread_id).on('postgres_changes', {
                                            event: 'INSERT',
                                            schema: 'public',
                                            table: 'chat_messages',
                                            filter: "chat_thread_id=eq.".concat(thread.chat_thread_id)
                                        }, {
                                            "AdminUserDetail.useEffect.loadAll": function(payload) {
                                                var newMsg = payload.new;
                                                setMessages({
                                                    "AdminUserDetail.useEffect.loadAll": function(prev) {
                                                        var filtered = prev.filter({
                                                            "AdminUserDetail.useEffect.loadAll.filtered": function(m) {
                                                                return !m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body;
                                                            }
                                                        }["AdminUserDetail.useEffect.loadAll.filtered"]);
                                                        if (filtered.some({
                                                            "AdminUserDetail.useEffect.loadAll": function(m) {
                                                                return m.chat_message_id === newMsg.chat_message_id;
                                                            }
                                                        }["AdminUserDetail.useEffect.loadAll"])) return filtered;
                                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(filtered).concat([
                                                            newMsg
                                                        ]);
                                                    }
                                                }["AdminUserDetail.useEffect.loadAll"]);
                                            }
                                        }["AdminUserDetail.useEffect.loadAll"]).subscribe();
                                        _state.label = 11;
                                    case 11:
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["AdminUserDetail.useEffect.loadAll"]);
                    }
                }["AdminUserDetail.useEffect.loadAll"])();
            };
            if (!id || !session) return;
            loadAll();
        }
    }["AdminUserDetail.useEffect"], [
        id,
        session
    ]);
    // Mark inquiry read
    var openInquiry = function(item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var productId, data;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setSelectedInq(item);
                        productId = item.product_id || item.guest_inquiry_id && null;
                        if (!item.product_id) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('product_id', item.product_id).single()
                        ];
                    case 1:
                        data = _state.sent().data;
                        setSelectedInqProduct(data || null);
                        return [
                            3,
                            3
                        ];
                    case 2:
                        setSelectedInqProduct(null);
                        _state.label = 3;
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var markInqRead = function(item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').update({
                                is_read: true,
                                read_at: new Date().toISOString()
                            }).eq('account_inquiry_id', item.account_inquiry_id)
                        ];
                    case 1:
                        _state.sent();
                        setInquiries(function(prev) {
                            return prev.map(function(i) {
                                return i.account_inquiry_id === item.account_inquiry_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, i), {
                                    is_read: true
                                }) : i;
                            });
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Mark SR read
    var markSRRead = function(item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').update({
                                is_read: true,
                                read_at: new Date().toISOString()
                            }).eq('service_request_id', item.service_request_id)
                        ];
                    case 1:
                        _state.sent();
                        setSR(function(prev) {
                            return prev.map(function(i) {
                                return i.service_request_id === item.service_request_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, i), {
                                    is_read: true
                                }) : i;
                            });
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // List-level WO actions (also called from WorkOrderDetailModal via props)
    var appendLog = function(wo, action, by) {
        var prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
            {
                action: action,
                by: by,
                at: new Date().toISOString()
            }
        ]);
    };
    var completeWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var log, now, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        console.log('completeWO fired, status:', wo.status, 'id:', wo.work_order_id);
                        log = appendLog(wo, 'COMPLETE by admin', 'admin');
                        now = new Date().toISOString();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'COMPLETE',
                                completed_at: now,
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id)
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Complete WO error:', error.message);
                            alert('Error: ' + error.message);
                            return [
                                2
                            ];
                        }
                        setWO(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'COMPLETE',
                                    completed_at: now,
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'COMPLETE',
                                completed_at: now,
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var cancelWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var reason, log, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        reason = prompt('Cancel reason:');
                        if (!reason) return [
                            2
                        ];
                        log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'CANCELLED',
                                cancelled_at: new Date().toISOString(),
                                cancel_reason: reason,
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id)
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Cancel WO error:', error.message);
                            return [
                                2
                            ];
                        }
                        setWO(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'CANCELLED',
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'CANCELLED',
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    if (checking) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#060606',
            height: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/pages/admin/users/[id].tsx",
        lineNumber: 170,
        columnNumber: 24
    }, this);
    var isGuest = id === ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
    var unreadInq = inquiries.some(function(i) {
        return !i.is_read;
    });
    var unreadSR = serviceRequests.some(function(i) {
        return !i.is_read;
    });
    var unreadWO = workOrders.some(function(w) {
        return w.status === 'CREATED';
    });
    var TABS = [
        {
            id: 'dashboard',
            label: 'Dashboard'
        },
        {
            id: 'inquiries',
            label: 'Inquiries',
            dot: unreadInq
        },
        {
            id: 'service',
            label: 'Service Requests',
            dot: unreadSR
        },
        {
            id: 'workorders',
            label: 'Work Orders',
            dot: unreadWO
        },
        {
            id: 'invoices',
            label: 'Invoices'
        }
    ];
    var inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["adminCss"]
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100vh',
                        overflow: 'hidden'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '19px',
                                padding: '13px 25px',
                                borderBottom: '1px solid var(--ln)',
                                background: 'var(--k1)',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: function() {
                                        return router.push('/admin/users');
                                    },
                                    className: "hidden md:inline-block",
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.45)',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        letterSpacing: '.09em',
                                        textTransform: 'uppercase',
                                        fontFamily: "'Montserrat'",
                                        transition: 'color .15s'
                                    },
                                    onMouseEnter: function(e) {
                                        return e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                                    },
                                    onMouseLeave: function(e) {
                                        return e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                                    },
                                    children: "← USER LIST"
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontSize: '17px',
                                        textTransform: 'uppercase',
                                        color: 'rgba(45,212,191,1)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '5px',
                                                color: 'var(--d2)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '.15em',
                                                marginRight: '11px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        isGuest ? 'Guest Account' : (user === null || user === void 0 ? void 0 : user.name) || 'User'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '16px',
                                        marginLeft: '24px'
                                    },
                                    children: TABS.map(function(t) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: function() {
                                                return setActiveTab(t.id);
                                            },
                                            style: {
                                                padding: '13px 17px',
                                                fontFamily: 'var(--sans)',
                                                fontSize: '13px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: 'none',
                                                borderBottom: activeTab === t.id ? '.5px solid var(--gl)' : '1px solid transparent',
                                                color: activeTab === t.id ? 'var(--wh)' : 'var(--d1)',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            },
                                            children: [
                                                t.label,
                                                t.dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '-7px',
                                                        width: '7px',
                                                        height: '7px',
                                                        borderRadius: '20%',
                                                        background: 'var(--er)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 29
                                                }, _this)
                                            ]
                                        }, t.id, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                overflow: 'auto',
                                padding: '29px 41px'
                            },
                            children: [
                                activeTab === 'dashboard' && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '45px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: '19px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: 'var(--serif)',
                                                                fontSize: '25px',
                                                                color: 'rgb(224, 187, 50)'
                                                            },
                                                            children: "Account Info"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ab",
                                                            onClick: function() {
                                                                return setShowEditUser(true);
                                                            },
                                                            children: "Edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 19
                                                }, this),
                                                [
                                                    {
                                                        label: 'Name',
                                                        val: user.name
                                                    },
                                                    {
                                                        label: 'Email',
                                                        val: user.email
                                                    },
                                                    {
                                                        label: 'Phone',
                                                        val: user.phone || '—'
                                                    },
                                                    {
                                                        label: 'Address',
                                                        val: user.shipping_address || '—'
                                                    },
                                                    {
                                                        label: 'Business',
                                                        val: user.business_name || '—'
                                                    },
                                                    {
                                                        label: 'Member Since',
                                                        val: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(user.created_at)
                                                    }
                                                ].map(function(f) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginBottom: '15px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    fontWeight: 500,
                                                                    letterSpacing: '.2em',
                                                                    textTransform: 'uppercase',
                                                                    color: 'var(--d1)',
                                                                    marginBottom: '7px'
                                                                },
                                                                children: f.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '17px',
                                                                    color: f.label === 'Phone' ? '#377da2' : 'var(--tx)'
                                                                },
                                                                children: f.val
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, f.label, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, _this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: '9px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "pill ".concat(user.status === 'ACTIVE' ? 'pill-A' : 'pill-I'),
                                                        children: user.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '17px',
                                                alignContent: 'start'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: woCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Work Orders"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 167
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(invTotal)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Total Invoiced"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 181
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: inqCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Inquiries"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 168
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: srCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Service Requests"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 167
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this),
                                activeTab === 'inquiries' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'var(--sans)',
                                                        fontSize: '11px',
                                                        letterSpacing: '.2em',
                                                        textTransform: 'uppercase',
                                                        color: 'var(--d1)',
                                                        marginBottom: '12px'
                                                    },
                                                    children: "Anonymous Visitor Inquiries"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this),
                                                guestInquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "empty",
                                                    style: {
                                                        marginBottom: '24px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "empty-tx",
                                                        children: "No guest inquiries"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 25
                                                }, this) : guestInquiries.map(function(inq) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: function() {
                                                            return openInquiry(inq);
                                                        },
                                                        style: {
                                                            background: 'var(--k1)',
                                                            border: '1px solid var(--ln)',
                                                            padding: '17px',
                                                            marginBottom: '9px',
                                                            cursor: 'pointer'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'flex-start',
                                                                    marginBottom: '10px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '15px',
                                                                                    color: 'var(--wh)',
                                                                                    marginBottom: '3px'
                                                                                },
                                                                                children: inq.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 257,
                                                                                columnNumber: 31
                                                                            }, _this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '13px',
                                                                                    color: 'var(--d1)'
                                                                                },
                                                                                children: inq.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 258,
                                                                                columnNumber: 31
                                                                            }, _this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '13px',
                                                                                    color: '#377da2'
                                                                                },
                                                                                children: inq.phone
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 259,
                                                                                columnNumber: 31
                                                                            }, _this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                                        lineNumber: 256,
                                                                        columnNumber: 29
                                                                    }, _this),
                                                                    !inq.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: '7px',
                                                                            height: '7px',
                                                                            borderRadius: '50%',
                                                                            background: 'var(--gl)',
                                                                            marginTop: '4px'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                                        lineNumber: 261,
                                                                        columnNumber: 46
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 27
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '15px',
                                                                    color: 'var(--tx)',
                                                                    marginBottom: '7px',
                                                                    lineHeight: 1.6
                                                                },
                                                                children: inq.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 27
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: 'var(--d1)'
                                                                },
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at),
                                                                    " · ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(inq.created_at)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 27
                                                            }, _this)
                                                        ]
                                                    }, inq.guest_inquiry_id, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 25
                                                    }, _this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '1px',
                                                        background: 'var(--ln)',
                                                        margin: '20px 0 16px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'var(--sans)',
                                                        fontSize: '11px',
                                                        letterSpacing: '.2em',
                                                        textTransform: 'uppercase',
                                                        color: 'var(--d1)',
                                                        marginBottom: '12px'
                                                    },
                                                    children: "Account Inquiries"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        inquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "empty",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty-tx",
                                                children: "No inquiries"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 273,
                                                columnNumber: 44
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 273,
                                            columnNumber: 21
                                        }, this) : inquiries.map(function(inq) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: function() {
                                                    markInqRead(inq);
                                                    openInquiry(inq);
                                                },
                                                style: {
                                                    background: 'var(--k1)',
                                                    border: '1px solid var(--ln)',
                                                    padding: '17px',
                                                    marginBottom: '9px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    gap: '13px',
                                                    alignItems: 'flex-start'
                                                },
                                                children: [
                                                    !inq.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '7px',
                                                            height: '9px',
                                                            borderRadius: '50%',
                                                            background: 'var(--gl)',
                                                            marginTop: '7px',
                                                            flexShrink: 0
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 40
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '19px',
                                                                    color: 'var(--tx)',
                                                                    marginBottom: '7px'
                                                                },
                                                                children: inq.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '17px',
                                                                    color: 'var(--d1)'
                                                                },
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at),
                                                                    " · ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(inq.created_at)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 25
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 23
                                                    }, _this)
                                                ]
                                            }, inq.account_inquiry_id, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, _this);
                                        })
                                    ]
                                }, void 0, true),
                                activeTab === 'service' && (serviceRequests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "empty",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "empty-tx",
                                        children: "No service requests"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 290,
                                        columnNumber: 69
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 290,
                                    columnNumber: 46
                                }, this) : serviceRequests.map(function(sr) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: function() {
                                            return markSRRead(sr);
                                        },
                                        style: {
                                            background: 'var(--k1)',
                                            border: '1px solid var(--ln)',
                                            padding: '17px',
                                            marginBottom: '9px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            gap: '11px',
                                            alignItems: 'flex-start'
                                        },
                                        children: [
                                            !sr.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '7px',
                                                    height: '7px',
                                                    borderRadius: '50%',
                                                    background: 'var(--gl)',
                                                    marginTop: '7px',
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 294,
                                                columnNumber: 35
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--gl)',
                                                            marginBottom: '7px'
                                                        },
                                                        children: sr.service_type
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--tx)',
                                                            marginBottom: '7px'
                                                        },
                                                        children: sr.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--d1)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(sr.created_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, sr.service_request_id, true, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, _this);
                                })),
                                activeTab === 'workorders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '17px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: 'var(--serif)',
                                                        fontSize: '24px',
                                                        color: 'var(--wh)'
                                                    },
                                                    children: "Work Orders"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this),
                                                !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn-add",
                                                    onClick: function() {
                                                        return setShowAddWO(true);
                                                    },
                                                    children: "+ Add Work Order"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 307,
                                            columnNumber: 17
                                        }, this),
                                        workOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "empty",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty-tx",
                                                children: "No work orders"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 311,
                                                columnNumber: 67
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 311,
                                            columnNumber: 44
                                        }, this) : workOrders.map(function(wo) {
                                            var _STATUS_COLORS_wo_status, _STATUS_COLORS_wo_status1;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: 'var(--k1)',
                                                    border: '1px solid var(--ln)',
                                                    padding: '11px',
                                                    marginBottom: '9px',
                                                    cursor: 'pointer'
                                                },
                                                onClick: function() {
                                                    return setSelectedWO(wo);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: '7px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: 'var(--serif)',
                                                                    fontSize: '17px',
                                                                    color: 'var(--wh)'
                                                                },
                                                                children: wo.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 315,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '9px',
                                                                    fontWeight: 500,
                                                                    letterSpacing: '.2em',
                                                                    textTransform: 'uppercase',
                                                                    padding: '4px 9px',
                                                                    background: (_STATUS_COLORS_wo_status = STATUS_COLORS[wo.status]) === null || _STATUS_COLORS_wo_status === void 0 ? void 0 : _STATUS_COLORS_wo_status.bg,
                                                                    color: (_STATUS_COLORS_wo_status1 = STATUS_COLORS[wo.status]) === null || _STATUS_COLORS_wo_status1 === void 0 ? void 0 : _STATUS_COLORS_wo_status1.color
                                                                },
                                                                children: wo.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '13px',
                                                            color: 'var(--d1)',
                                                            marginBottom: '6px'
                                                        },
                                                        children: wo.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 21
                                                    }, _this),
                                                    wo.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '15px',
                                                            color: 'rgba(45,212,191,1)',
                                                            fontFamily: "'Courier New', monospace"
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(wo.estimated_price)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 44
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: 'var(--d2)',
                                                            marginTop: '8px'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(wo.created_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '9px',
                                                            marginTop: '11px'
                                                        },
                                                        onClick: function(e) {
                                                            return e.stopPropagation();
                                                        },
                                                        children: [
                                                            (wo.status === 'ACCEPTED' || wo.status === 'CONFIRMED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "ab pub",
                                                                onClick: function() {
                                                                    return completeWO(wo);
                                                                },
                                                                children: "Complete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 83
                                                            }, _this),
                                                            (wo.status === 'CREATED' || wo.status === 'ACCEPTED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "ab rem",
                                                                onClick: function() {
                                                                    return cancelWO(wo);
                                                                },
                                                                children: "Cancel"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 81
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, wo.work_order_id, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 313,
                                                columnNumber: 19
                                            }, _this);
                                        })
                                    ]
                                }, void 0, true),
                                activeTab === 'invoices' && (invoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "empty",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "empty-tx",
                                        children: "No invoices"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 332,
                                        columnNumber: 62
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 332,
                                    columnNumber: 39
                                }, this) : invoices.map(function(inv) {
                                    var _inv_line_items, _inv_stripe_session_id;
                                    var item = (_inv_line_items = inv.line_items) === null || _inv_line_items === void 0 ? void 0 : _inv_line_items[0];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--k1)',
                                            border: '1px solid var(--ln)',
                                            padding: '15px',
                                            marginBottom: '9px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: 'var(--serif)',
                                                            fontSize: '25px',
                                                            color: 'var(--wh)'
                                                        },
                                                        children: (item === null || item === void 0 ? void 0 : item.title) || 'Product'
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--d2)',
                                                            marginTop: '7px',
                                                            fontFamily: 'monospace'
                                                        },
                                                        children: [
                                                            (_inv_stripe_session_id = inv.stripe_session_id) === null || _inv_stripe_session_id === void 0 ? void 0 : _inv_stripe_session_id.slice(0, 20),
                                                            "..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '21px',
                                                            color: 'var(--d1)',
                                                            marginTop: '5px'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(inv.paid_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 23
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 337,
                                                columnNumber: 21
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: 'var(--serif)',
                                                            fontSize: '17px',
                                                            color: 'var(--gl)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(inv.total_amount)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "pill pill-A",
                                                        style: {
                                                            marginTop: '5px'
                                                        },
                                                        children: "PAID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 23
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 342,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, inv.invoice_id, true, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, _this);
                                }))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        chatThread && !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            chatThread: chatThread,
                            messages: messages,
                            setMessages: setMessages,
                            user: user,
                            id: id,
                            session: session
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/users/[id].tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                showAddWO: showAddWO,
                setShowAddWO: setShowAddWO,
                user: user,
                id: id,
                session: session,
                setWO: setWO,
                setWoCount: setWoCount
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                showEditUser: showEditUser,
                setShowEditUser: setShowEditUser,
                user: user,
                id: id,
                setUser: setUser
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                selectedInq: selectedInq,
                setSelectedInq: setSelectedInq,
                selectedInqProduct: selectedInqProduct,
                setSelectedInqProduct: setSelectedInqProduct,
                user: user
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                selectedWO: selectedWO,
                setSelectedWO: setSelectedWO,
                user: user,
                session: session,
                adminInfo: adminInfo,
                setWO: setWO
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AdminUserDetail, "aAbICJI64PmOdSAQhL/w0jVRsNM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminUserDetail;
var _c;
__turbopack_context__.k.register(_c, "AdminUserDetail");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/admin/users/[id].tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/admin/users/[id]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/pages/admin/users/[id].tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/admin/users/[id].tsx\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/admin/users/[id].tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__06915e31._.js.map