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
"[project]/components/home/MobileIndustrySection.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileIndustrySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
function MobileIndustrySection() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileIndustrySection.useEffect": function() {
            var yearsEl = document.getElementById('mobile-years');
            var sevenEl = document.getElementById('mobile-seven');
            var industrySection = document.getElementById('mobile-industry-section');
            if (!yearsEl || !sevenEl || !industrySection) return;
            var glowTriggered = false;
            var glowObserver = new IntersectionObserver({
                "MobileIndustrySection.useEffect": function(entries) {
                    entries.forEach({
                        "MobileIndustrySection.useEffect": function(entry) {
                            if (entry.isIntersecting && !glowTriggered) {
                                glowTriggered = true;
                                yearsEl.style.transition = 'color 700ms ease-out, text-shadow 700ms ease-out';
                                yearsEl.style.color = '#d4af37';
                                yearsEl.style.textShadow = '0 0 10px rgba(212,175,55,0.55), 0 0 22px rgba(212,175,55,0.28), 0 0 44px rgba(212,175,55,0.14)';
                                setTimeout({
                                    "MobileIndustrySection.useEffect": function() {
                                        sevenEl.style.transition = 'color 700ms ease-out, text-shadow 700ms ease-out';
                                        sevenEl.style.color = '#d4af37';
                                        sevenEl.style.textShadow = '0 0 10px rgba(212,175,55,0.55), 0 0 22px rgba(212,175,55,0.28), 0 0 44px rgba(212,175,55,0.14)';
                                    }
                                }["MobileIndustrySection.useEffect"], 250);
                            }
                        }
                    }["MobileIndustrySection.useEffect"]);
                }
            }["MobileIndustrySection.useEffect"], {
                threshold: 0.65
            });
            glowObserver.observe(industrySection);
            return ({
                "MobileIndustrySection.useEffect": function() {
                    return glowObserver.disconnect();
                }
            })["MobileIndustrySection.useEffect"];
        }
    }["MobileIndustrySection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "mobile-industry-section",
        className: "md:hidden text-center px-4 flex flex-col items-center justify-center",
        style: {
            background: '#050505',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            minHeight: '100svh',
            paddingTop: '40px',
            paddingBottom: '40px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "uppercase mb-2",
                style: {
                    fontSize: '11px',
                    letterSpacing: '0.29em',
                    color: 'rgba(255,255,255,0.52)'
                },
                children: "Industry for"
            }, void 0, false, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: "mobile-years",
                style: {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)'
                },
                children: "13 Years"
            }, void 0, false, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.52)',
                    marginTop: '4px'
                },
                children: [
                    "Cutting for ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        id: "mobile-seven",
                        children: "Seven"
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileIndustrySection.tsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/MobileIndustrySection.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MobileIndustrySection, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = MobileIndustrySection;
var _c;
__turbopack_context__.k.register(_c, "MobileIndustrySection");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/homeData.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "services",
    ()=>services
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gem.js [client] (ecmascript) <export default as Gem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [client] (ecmascript) <export default as Layers>");
;
;
var services = [
    {
        title: 'Custom Cutting',
        description: "Receive a tailored cutting experience designed to reveal a gemstone's highest potential.",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__["Gem"]
    },
    {
        title: 'Re-Polish & Re-Cut',
        description: 'Breathe new life into existing cut stones and restore their beauty without compromising weight.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"]
    },
    {
        title: 'Jeweler Services',
        description: 'Online service requests and work orders  for industry professionals for quick turn arounds and shorter lead times.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        title: 'Sell Gemstones',
        description: 'An online shop with custom and flexible purchasing features, including pay now, pay later, inquiries and negotiations directly through the site.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
    },
    {
        title: 'Buy Rough',
        description: 'Source quality rough gemstones for your cutting projects.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
    },
    {
        title: 'Buy Gems In Bulk',
        description: 'Wholesale purchasing from jewelers and dealers.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
    }
];
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/MobileServicesCarousel.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileServicesCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/homeData.ts [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
function computeSectionTopBottom(section) {
    var top = section.getBoundingClientRect().top + window.scrollY;
    var bottom = top + section.offsetHeight;
    return {
        top: top,
        bottom: bottom
    };
}
function MobileServicesCarousel() {
    var _this = this;
    _s();
    var lockedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var unlockCooldownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var currentFocusIndexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(-1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileServicesCarousel.useEffect": function() {
            if (("TURBOPACK compile-time value", "object") === 'undefined' || window.innerWidth >= 768) return;
            var section = document.getElementById('services-section');
            var scroller = document.getElementById('mobile-services-scroll');
            var cards = document.querySelectorAll('[data-service-card-mobile]');
            var arrowEl = document.getElementById('mobile-scroll-arrow');
            if (!section || !scroller || cards.length === 0) return;
            var defocus = {
                "MobileServicesCarousel.useEffect.defocus": function(card) {
                    var el = card;
                    el.style.transition = 'opacity 400ms ease-out, filter 400ms ease-out, transform 400ms ease-out';
                    el.style.opacity = '0.20';
                    el.style.filter = 'blur(3px)';
                    el.style.transform = 'scale(0.98)';
                    el.style.pointerEvents = 'none';
                    var icon = el.querySelector('[data-service-icon]');
                    if (icon) {
                        icon.style.transition = 'transform 520ms ease-out, filter 520ms ease-out, opacity 520ms ease-out';
                        icon.style.transitionDelay = '60ms';
                        icon.style.opacity = '0.75';
                        icon.style.transform = 'scale(0.96) translateY(2px)';
                        icon.style.filter = 'drop-shadow(0 0 0 rgba(212,175,55,0))';
                    }
                }
            }["MobileServicesCarousel.useEffect.defocus"];
            var focus = {
                "MobileServicesCarousel.useEffect.focus": function(card) {
                    var el = card;
                    el.style.transition = 'opacity 500ms ease-out, filter 500ms ease-out, transform 500ms ease-out';
                    el.style.opacity = '1';
                    el.style.filter = 'blur(0px)';
                    el.style.transform = 'scale(1)';
                    el.style.pointerEvents = 'auto';
                    var icon = el.querySelector('[data-service-icon]');
                    if (icon) {
                        icon.style.transition = 'transform 640ms ease-out, filter 640ms ease-out, opacity 640ms ease-out';
                        icon.style.transitionDelay = '110ms';
                        icon.style.opacity = '1';
                        icon.style.transform = 'scale(1.02) translateY(0px)';
                        icon.style.filter = 'drop-shadow(0 0 10px rgba(212,175,55,0.18)) drop-shadow(0 0 22px rgba(212,175,55,0.10))';
                    }
                }
            }["MobileServicesCarousel.useEffect.focus"];
            cards.forEach(defocus);
            var handleFocus = {
                "MobileServicesCarousel.useEffect.handleFocus": function() {
                    var headerEl = document.getElementById('services-sticky-header');
                    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 0;
                    var viewportMidpoint = headerH + (scroller.clientHeight - headerH) / 2;
                    var closestIndex = -1;
                    var closestDistance = Infinity;
                    cards.forEach({
                        "MobileServicesCarousel.useEffect.handleFocus": function(card, i) {
                            var rect = card.getBoundingClientRect();
                            var scrollerRect = scroller.getBoundingClientRect();
                            var cardCenter = rect.top - scrollerRect.top + rect.height / 2;
                            var distance = Math.abs(cardCenter - viewportMidpoint);
                            if (distance < closestDistance) {
                                closestDistance = distance;
                                closestIndex = i;
                            }
                        }
                    }["MobileServicesCarousel.useEffect.handleFocus"]);
                    if (closestIndex !== currentFocusIndexRef.current) {
                        cards.forEach({
                            "MobileServicesCarousel.useEffect.handleFocus": function(card, i) {
                                if (i === closestIndex) focus(card);
                                else defocus(card);
                            }
                        }["MobileServicesCarousel.useEffect.handleFocus"]);
                        currentFocusIndexRef.current = closestIndex;
                    }
                    if (arrowEl) {
                        var isLast = closestIndex === cards.length - 1;
                        arrowEl.style.opacity = isLast ? '0' : '1';
                        arrowEl.style.pointerEvents = 'none';
                    }
                }
            }["MobileServicesCarousel.useEffect.handleFocus"];
            var inSection = {
                "MobileServicesCarousel.useEffect.inSection": function() {
                    var r = section.getBoundingClientRect();
                    return r.top <= 8 && r.bottom >= window.innerHeight * 0.65;
                }
            }["MobileServicesCarousel.useEffect.inSection"];
            var lock = {
                "MobileServicesCarousel.useEffect.lock": function() {
                    if (lockedRef.current || unlockCooldownRef.current) return;
                    lockedRef.current = true;
                    document.body.style.overflow = 'hidden';
                    var top = computeSectionTopBottom(section).top;
                    window.scrollTo({
                        top: top,
                        behavior: 'auto'
                    });
                    scroller.style.scrollSnapType = 'none';
                    scroller.scrollTop = 0;
                    requestAnimationFrame({
                        "MobileServicesCarousel.useEffect.lock": function() {
                            scroller.style.scrollSnapType = 'y mandatory';
                            scroller.dispatchEvent(new Event('scroll'));
                        }
                    }["MobileServicesCarousel.useEffect.lock"]);
                }
            }["MobileServicesCarousel.useEffect.lock"];
            var unlock = {
                "MobileServicesCarousel.useEffect.unlock": function(direction) {
                    if (!lockedRef.current) return;
                    lockedRef.current = false;
                    unlockCooldownRef.current = true;
                    document.body.style.overflow = '';
                    var _computeSectionTopBottom = computeSectionTopBottom(section), top = _computeSectionTopBottom.top, bottom = _computeSectionTopBottom.bottom;
                    var target = direction === 'down' ? bottom + 1 : top - 1;
                    window.scrollTo({
                        top: target,
                        behavior: 'auto'
                    });
                    window.setTimeout({
                        "MobileServicesCarousel.useEffect.unlock": function() {
                            unlockCooldownRef.current = false;
                        }
                    }["MobileServicesCarousel.useEffect.unlock"], 250);
                }
            }["MobileServicesCarousel.useEffect.unlock"];
            var atTop = {
                "MobileServicesCarousel.useEffect.atTop": function() {
                    return scroller.scrollTop <= 2;
                }
            }["MobileServicesCarousel.useEffect.atTop"];
            var atBottom = {
                "MobileServicesCarousel.useEffect.atBottom": function() {
                    return scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
                }
            }["MobileServicesCarousel.useEffect.atBottom"];
            var handleWindowScroll = {
                "MobileServicesCarousel.useEffect.handleWindowScroll": function() {
                    if (inSection()) lock();
                }
            }["MobileServicesCarousel.useEffect.handleWindowScroll"];
            var onWheel = {
                "MobileServicesCarousel.useEffect.onWheel": function(e) {
                    if (!lockedRef.current) return;
                    var dy = e.deltaY;
                    if (dy > 0 && atBottom()) {
                        e.preventDefault();
                        unlock('down');
                        return;
                    }
                    if (dy < 0 && atTop()) {
                        e.preventDefault();
                        unlock('up');
                        return;
                    }
                }
            }["MobileServicesCarousel.useEffect.onWheel"];
            var lastTouchY = null;
            var onTouchStart = {
                "MobileServicesCarousel.useEffect.onTouchStart": function(e) {
                    var _ref;
                    var _e_touches_;
                    if (!lockedRef.current) return;
                    lastTouchY = (_ref = (_e_touches_ = e.touches[0]) === null || _e_touches_ === void 0 ? void 0 : _e_touches_.clientY) !== null && _ref !== void 0 ? _ref : null;
                }
            }["MobileServicesCarousel.useEffect.onTouchStart"];
            var onTouchMove = {
                "MobileServicesCarousel.useEffect.onTouchMove": function(e) {
                    var _ref;
                    var _e_touches_;
                    if (!lockedRef.current) return;
                    if (lastTouchY == null) return;
                    var y = (_ref = (_e_touches_ = e.touches[0]) === null || _e_touches_ === void 0 ? void 0 : _e_touches_.clientY) !== null && _ref !== void 0 ? _ref : lastTouchY;
                    var dy = lastTouchY - y;
                    if (dy > 0 && atBottom()) {
                        e.preventDefault();
                        unlock('down');
                        lastTouchY = null;
                        return;
                    }
                    if (dy < 0) {
                        e.preventDefault();
                        unlock('up');
                        lastTouchY = null;
                        return;
                    }
                    lastTouchY = y;
                }
            }["MobileServicesCarousel.useEffect.onTouchMove"];
            window.addEventListener('scroll', handleWindowScroll, {
                passive: true
            });
            scroller.addEventListener('scroll', handleFocus, {
                passive: true
            });
            scroller.addEventListener('wheel', onWheel, {
                passive: false
            });
            scroller.addEventListener('touchstart', onTouchStart, {
                passive: true
            });
            scroller.addEventListener('touchmove', onTouchMove, {
                passive: false
            });
            handleFocus();
            handleWindowScroll();
            return ({
                "MobileServicesCarousel.useEffect": function() {
                    window.removeEventListener('scroll', handleWindowScroll);
                    scroller.removeEventListener('scroll', handleFocus);
                    scroller.removeEventListener('wheel', onWheel);
                    scroller.removeEventListener('touchstart', onTouchStart);
                    scroller.removeEventListener('touchmove', onTouchMove);
                    document.body.style.overflow = '';
                }
            })["MobileServicesCarousel.useEffect"];
        }
    }["MobileServicesCarousel.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "md:hidden flex flex-col relative",
        style: {
            height: 'calc(100vh - 90px)',
            marginTop: '8px',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none",
                style: {
                    height: '80px',
                    background: 'linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0) 100%)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none",
                style: {
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0) 100%)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "mobile-services-scroll",
                className: "flex flex-col",
                style: {
                    gap: '32px',
                    flex: 1,
                    overflowY: 'auto',
                    scrollSnapType: 'y mandatory',
                    WebkitOverflowScrolling: 'touch',
                    paddingTop: '8px',
                    paddingBottom: '120px',
                    scrollbarWidth: 'none',
                    scrollPaddingTop: '0px'
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["services"].map(function(service, i) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-service-card-mobile": true,
                        style: {
                            scrollSnapAlign: 'center',
                            scrollSnapStop: 'always',
                            minHeight: 'calc(100vh - 110px)',
                            padding: '32px',
                            paddingTop: '48px',
                            borderRadius: '16px',
                            backgroundColor: '#0A0A0A',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            opacity: 0.55,
                            filter: 'blur(3px)',
                            transform: 'scale(0.98)',
                            willChange: 'opacity, filter, transform'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-service-icon": true,
                                style: {
                                    marginBottom: '24px',
                                    transition: 'transform 520ms ease-out, filter 520ms ease-out, opacity 520ms ease-out',
                                    transitionDelay: "".concat(35 + i * 18, "ms"),
                                    transform: 'scale(0.98)',
                                    opacity: 0.9,
                                    filter: 'drop-shadow(0 0 0 rgba(212,175,55,0))'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(service.Icon, {
                                    size: 36,
                                    color: "#d4af37",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(22px, 6vw, 26px)',
                                    fontWeight: 400,
                                    color: '#FAFAFA',
                                    marginBottom: '16px',
                                    textAlign: 'left'
                                },
                                children: service.title
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '16px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.70)',
                                    textAlign: 'left'
                                },
                                children: service.description
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, service.title, true, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, _this);
                })
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "mobile-scroll-arrow",
                style: {
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    opacity: 1,
                    transition: 'opacity 400ms ease',
                    pointerEvents: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-ui)',
                            fontSize: '10px',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.35)'
                        },
                        children: "Scroll"
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '1px',
                            height: '32px',
                            background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), rgba(212,175,55,0))',
                            animation: 'scrollPulse 1.6s ease-in-out infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_s(MobileServicesCarousel, "HX1/1olV9znW82TFHcew4weBEfw=");
_c = MobileServicesCarousel;
var _c;
__turbopack_context__.k.register(_c, "MobileServicesCarousel");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/DesktopServicesGrid.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DesktopServicesGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/homeData.ts [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
function DesktopServicesGrid() {
    var _this = this;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesktopServicesGrid.useEffect": function() {
            var cards = document.querySelectorAll('[data-service-card]');
            // Set initial hidden state before any transition is applied
            cards.forEach({
                "DesktopServicesGrid.useEffect": function(el, i) {
                    var card = el;
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px)';
                    var icon = card.querySelector('[data-service-icon]');
                    if (icon) {
                        icon.style.opacity = '0';
                        icon.style.transform = 'translateY(30px)';
                    }
                    var title = card.querySelector('[data-service-title]');
                    if (title) {
                        title.style.opacity = '0';
                        title.style.transform = 'translateY(16px)';
                    }
                    var desc = card.querySelector('[data-service-desc]');
                    if (desc) {
                        desc.style.opacity = '0';
                        desc.style.transform = 'translateY(12px)';
                    }
                }
            }["DesktopServicesGrid.useEffect"]);
            var observer = new IntersectionObserver({
                "DesktopServicesGrid.useEffect": function(entries) {
                    entries.forEach({
                        "DesktopServicesGrid.useEffect": function(entry) {
                            if (entry.isIntersecting) {
                                var card = entry.target;
                                var i = parseInt(card.dataset.index || '0');
                                var base = i * 80;
                                // Card fades in
                                card.style.transition = "opacity 600ms ease-out ".concat(base, "ms, transform 600ms ease-out ").concat(base, "ms");
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                                // Icon flies in from further below with more drama
                                var icon = card.querySelector('[data-service-icon]');
                                if (icon) {
                                    icon.style.transition = "opacity 700ms ease-out ".concat(base + 150, "ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ").concat(base + 150, "ms");
                                    icon.style.opacity = '1';
                                    icon.style.transform = 'translateY(0)';
                                }
                                // Title fades in softly after icon
                                var title = card.querySelector('[data-service-title]');
                                if (title) {
                                    title.style.transition = "opacity 600ms ease-out ".concat(base + 260, "ms, transform 600ms ease-out ").concat(base + 260, "ms");
                                    title.style.opacity = '1';
                                    title.style.transform = 'translateY(0)';
                                }
                                // Desc fades in last
                                var desc = card.querySelector('[data-service-desc]');
                                if (desc) {
                                    desc.style.transition = "opacity 600ms ease-out ".concat(base + 360, "ms, transform 600ms ease-out ").concat(base + 360, "ms");
                                    desc.style.opacity = '1';
                                    desc.style.transform = 'translateY(0)';
                                }
                                observer.unobserve(card);
                            }
                        }
                    }["DesktopServicesGrid.useEffect"]);
                }
            }["DesktopServicesGrid.useEffect"], {
                threshold: 0.1,
                rootMargin: '0px 0px 180px 0px'
            });
            cards.forEach({
                "DesktopServicesGrid.useEffect": function(el) {
                    return observer.observe(el);
                }
            }["DesktopServicesGrid.useEffect"]);
            return ({
                "DesktopServicesGrid.useEffect": function() {
                    return observer.disconnect();
                }
            })["DesktopServicesGrid.useEffect"];
        }
    }["DesktopServicesGrid.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden md:grid",
        style: {
            marginTop: '48px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(16px, 2vw, 48px)'
        },
        children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["services"].map(function(service, i) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-service-card": true,
                "data-index": "".concat(i),
                className: "gem-card",
                style: {
                    aspectRatio: '1 / 1',
                    padding: 'clamp(24px, 3vw, 56px)',
                    borderRadius: '14px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.55)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-service-icon": true,
                        style: {
                            marginBottom: 'clamp(16px, 2vw, 32px)',
                            filter: 'drop-shadow(0 0 0 rgba(212,175,55,0))',
                            transition: 'filter 520ms ease-out, transform 250ms ease-out'
                        },
                        onMouseEnter: function(e) {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(212,175,55,0.18)) drop-shadow(0 0 22px rgba(212,175,55,0.10))';
                        },
                        onMouseLeave: function(e) {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 0 rgba(212,175,55,0))';
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(service.Icon, {
                            size: 48,
                            color: "#d4af37",
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        "data-service-title": true,
                        style: {
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(22px, 2.2vw, 36px)',
                            fontWeight: 400,
                            color: '#FAFAFA',
                            marginBottom: 'clamp(8px, 1vw, 20px)'
                        },
                        children: service.title
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        "data-service-desc": true,
                        style: {
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(12px, 1.1vw, 16px)',
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.65)',
                            flex: 1
                        },
                        children: service.description
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, _this)
                ]
            }, service.title, true, {
                fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, _this);
        })
    }, void 0, false, {
        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(DesktopServicesGrid, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = DesktopServicesGrid;
var _c;
__turbopack_context__.k.register(_c, "DesktopServicesGrid");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/PhilosophySection.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhilosophySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
var lines = [
    {
        gold: 'Color',
        rest: ' is the goal.'
    },
    {
        gold: 'Conscious',
        rest: ' of the weight.'
    },
    {
        gold: 'Careful',
        rest: ' with my approach.'
    },
    {
        gold: 'Cutting',
        rest: ' is my craft.'
    }
];
function PhilosophySection() {
    var _this = this;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhilosophySection.useEffect": function() {
            var words = document.querySelectorAll('[data-gold-word]');
            var observer = new IntersectionObserver({
                "PhilosophySection.useEffect": function(entries) {
                    entries.forEach({
                        "PhilosophySection.useEffect": function(entry) {
                            var el = entry.target;
                            if (entry.isIntersecting) {
                                el.style.color = 'rgb(30, 60, 180)';
                                el.style.textShadow = [
                                    '0 0 40px rgba(40,80,200,0.25)',
                                    '0 0 80px rgba(30,60,180,0.18)',
                                    '0 0 120px rgba(20,50,160,0.12)',
                                    '0 0 200px rgba(10,30,140,0.07)'
                                ].join(', ');
                                el.style.filter = 'drop-shadow(0 0 60px rgba(40,80,200,0.15))';
                            } else {
                                el.style.color = '#FAFAFA';
                                el.style.textShadow = 'none';
                                el.style.filter = 'none';
                            }
                        }
                    }["PhilosophySection.useEffect"]);
                }
            }["PhilosophySection.useEffect"], {
                threshold: 0.8,
                rootMargin: '0px 0px -20% 0px'
            });
            words.forEach({
                "PhilosophySection.useEffect": function(el) {
                    return observer.observe(el);
                }
            }["PhilosophySection.useEffect"]);
            return ({
                "PhilosophySection.useEffect": function() {
                    return observer.disconnect();
                }
            })["PhilosophySection.useEffect"];
        }
    }["PhilosophySection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 0'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-custom",
            style: {
                maxWidth: '1400px',
                width: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "uppercase text-gray-500 mb-4 text-center",
                    style: {
                        fontSize: '12px',
                        letterSpacing: '0.20em'
                    },
                    children: "Philosophy"
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "title-xl tracking-tight mb-16 text-center",
                    children: "My Four C's"
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem'
                    },
                    children: lines.map(function(param) {
                        var gold = param.gold, rest = param.rest;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.875rem, 6vw, 5.5rem)',
                                fontWeight: 400,
                                lineHeight: 1.25,
                                color: '#FAFAFA'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-gold-word": true,
                                    style: {
                                        color: '#FAFAFA',
                                        transition: 'color 1400ms cubic-bezier(0.25, 0.1, 0.25, 1), text-shadow 1400ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 1400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                                        whiteSpace: 'nowrap'
                                    },
                                    children: gold
                                }, void 0, false, {
                                    fileName: "[project]/components/home/PhilosophySection.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, _this),
                                rest
                            ]
                        }, gold, true, {
                            fileName: "[project]/components/home/PhilosophySection.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, _this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/PhilosophySection.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/PhilosophySection.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(PhilosophySection, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PhilosophySection;
var _c;
__turbopack_context__.k.register(_c, "PhilosophySection");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/StudioSection.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
function StudioSection() {
    _s();
    var sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var photoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var labelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var descRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudioSection.useEffect": function() {
            var section = sectionRef.current;
            var photo = photoRef.current;
            var title = titleRef.current;
            var label = labelRef.current;
            var desc = descRef.current;
            if (!section || !photo || !title || !label || !desc) return;
            var rafId;
            var snapLocked = false;
            var snapUsed = false;
            var isPressed = false;
            var unlock = {
                "StudioSection.useEffect.unlock": function() {
                    if (snapLocked) {
                        document.body.style.overflow = '';
                        snapLocked = false;
                    }
                }
            }["StudioSection.useEffect.unlock"];
            var onPointerDown = {
                "StudioSection.useEffect.onPointerDown": function() {
                    isPressed = true;
                    unlock();
                }
            }["StudioSection.useEffect.onPointerDown"];
            var onPointerUp = {
                "StudioSection.useEffect.onPointerUp": function() {
                    isPressed = false;
                }
            }["StudioSection.useEffect.onPointerUp"];
            var lockScroll = {
                "StudioSection.useEffect.lockScroll": function() {
                    if (snapLocked || snapUsed || isPressed) return;
                    snapLocked = true;
                    snapUsed = true;
                    document.body.style.overflow = 'hidden';
                }
            }["StudioSection.useEffect.lockScroll"];
            var onScrollReset = {
                "StudioSection.useEffect.onScrollReset": function() {
                    var rect = section.getBoundingClientRect();
                    var vh = window.innerHeight;
                    if (rect.bottom < 0 || rect.top > vh) snapUsed = false;
                }
            }["StudioSection.useEffect.onScrollReset"];
            var onScroll = {
                "StudioSection.useEffect.onScroll": function() {
                    cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame({
                        "StudioSection.useEffect.onScroll": function() {
                            var rect = section.getBoundingClientRect();
                            var vh = window.innerHeight;
                            var progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
                            var distFromCenter = Math.abs(progress - 0.5) * 2;
                            var focusEased = Math.max(0, 1 - distFromCenter * 1.4);
                            var eased = focusEased * focusEased * focusEased;
                            if (distFromCenter < 0.04 && eased > 0.92) lockScroll();
                            photo.style.opacity = String(0.04 + eased * 0.72);
                            photo.style.filter = "blur(".concat((1 - eased) * 12, "px) contrast(1.08)");
                            photo.style.transform = "scale(".concat(1.12 - eased * 0.06, ")");
                            var colorProgress = eased;
                            var r = Math.round(250 * (1 - colorProgress * 0.02));
                            var g = Math.round(250 * (1 - colorProgress * 0.31));
                            var b = Math.round(255 * (1 - colorProgress));
                            title.style.color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
                            title.style.textShadow = colorProgress > 0.2 ? [
                                "0 0 ".concat(colorProgress * 8, "px rgba(255,220,100,").concat(colorProgress * 0.95, ")"),
                                "0 0 ".concat(colorProgress * 20, "px rgba(212,175,55,").concat(colorProgress * 0.85, ")"),
                                "0 0 ".concat(colorProgress * 45, "px rgba(212,175,55,").concat(colorProgress * 0.6, ")"),
                                "0 0 ".concat(colorProgress * 90, "px rgba(180,140,30,").concat(colorProgress * 0.35, ")"),
                                "0 0 ".concat(colorProgress * 140, "px rgba(150,110,10,").concat(colorProgress * 0.15, ")")
                            ].join(', ') : 'none';
                            title.style.filter = colorProgress > 0.2 ? "drop-shadow(0 0 ".concat(colorProgress * 30, "px rgba(212,175,55,").concat(colorProgress * 0.4, "))") : 'none';
                            title.style.opacity = '1';
                            label.style.opacity = '1';
                            desc.style.opacity = '1';
                        }
                    }["StudioSection.useEffect.onScroll"]);
                }
            }["StudioSection.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            window.addEventListener('scroll', onScrollReset, {
                passive: true
            });
            window.addEventListener('wheel', unlock, {
                passive: true
            });
            window.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('touchstart', onPointerDown);
            window.addEventListener('touchend', onPointerUp);
            onScroll();
            return ({
                "StudioSection.useEffect": function() {
                    window.removeEventListener('scroll', onScroll);
                    window.removeEventListener('scroll', onScrollReset);
                    window.removeEventListener('wheel', unlock);
                    window.removeEventListener('pointerdown', onPointerDown);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('touchstart', onPointerDown);
                    window.removeEventListener('touchend', onPointerUp);
                    cancelAnimationFrame(rafId);
                    document.body.style.overflow = '';
                }
            })["StudioSection.useEffect"];
        }
    }["StudioSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sectionRef,
        style: {
            position: 'relative',
            height: '100svh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: photoRef,
                style: {
                    position: 'absolute',
                    inset: '-3%',
                    backgroundImage: 'url(/assets/Studio.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.04,
                    filter: 'blur(12px) contrast(1.08)',
                    transform: 'scale(1.12)',
                    transformOrigin: 'center center',
                    boxShadow: 'inset 0 0 0 8px #050505',
                    willChange: 'opacity, filter, transform',
                    transition: 'opacity 220ms ease-out, filter 220ms ease-out, transform 700ms ease-out'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background: 'linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.92) 22%, rgba(5,5,5,0.70) 38%, rgba(5,5,5,0.0) 55%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.0) 20%, rgba(5,5,5,0.0) 80%, #050505 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.88) 75%, rgba(5,5,5,1) 90%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    zIndex: 4,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    zIndex: 4,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to top, #050505 0%, transparent 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 3,
                    pointerEvents: 'none',
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '180px 180px',
                    opacity: 0.35,
                    mixBlendMode: 'overlay'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom",
                style: {
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: '380px',
                    marginLeft: '4vw',
                    marginRight: 'auto',
                    padding: '32px 36px',
                    background: 'rgba(5,5,5,0.25)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '12px',
                    textAlign: 'left'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        ref: labelRef,
                        className: "uppercase text-gray-400",
                        style: {
                            fontSize: '12px',
                            letterSpacing: '0.25em',
                            marginBottom: '16px'
                        },
                        children: "Where It Happens"
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: titleRef,
                        className: "title-xl",
                        style: {
                            marginBottom: '20px',
                            color: '#FAFAFA'
                        },
                        children: "The Studio"
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        ref: descRef,
                        style: {
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(13px, 1.3vw, 17px)',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.70)'
                        },
                        children: "Every stone passes through a focused, single-cutter environment — no outsourcing, no shortcuts. Just precise handwork from rough to finished gem."
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/StudioSection.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(StudioSection, "6Adp1ZTh+DePCWjNHlTHoHUmPGw=");
_c = StudioSection;
var _c;
__turbopack_context__.k.register(_c, "StudioSection");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/TopNav.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
// ── TopNav — Cutting Corners Gems ────────────────────────────
// Absolutely positioned so it overlays the hero section.
// Transitions from transparent to solid dark on scroll.
// Mobile: hamburger drawer.
// Desktop: horizontal links.
// Auth-aware: shows "Account" if session exists, "Login" if not.
// ─────────────────────────────────────────────────────────────
var NAV_LINKS = [
    {
        label: 'Shop',
        href: '/shop'
    },
    {
        label: 'Portfolio',
        href: '/portfolio'
    }
];
var css = "\n@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Oranienbaum&display=swap');\n\n.tnav {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 28px;\n  transition: background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease;\n  border-bottom: 0.5px solid transparent;\n}\n.tnav.scrolled {\n  background: rgba(5,5,5,0.92);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-bottom-color: rgba(255,255,255,0.07);\n}\n.tnav-brand {\n  font-family: 'Oranienbaum', Georgia, serif;\n  font-size: 17px;\n  font-weight: 400;\n  color: #FAFAFA;\n  text-decoration: none;\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n  transition: color 200ms ease;\n}\n.tnav-brand:hover { color: #d4af37; }\n.tnav-links {\n  display: flex;\n  align-items: center;\n  gap: 32px;\n}\n.tnav-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.6);\n  text-decoration: none;\n  transition: color 200ms ease;\n  position: relative;\n}\n.tnav-link::after {\n  content: '';\n  position: absolute;\n  bottom: -3px; left: 0; right: 100%;\n  height: 0.5px;\n  background: #d4af37;\n  transition: right 220ms ease;\n}\n.tnav-link:hover { color: #FAFAFA; }\n.tnav-link:hover::after { right: 0; }\n.tnav-auth {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: #d4af37;\n  text-decoration: none;\n  border: 0.5px solid rgba(212,175,55,0.45);\n  padding: 6px 14px;\n  transition: all 200ms ease;\n}\n.tnav-auth:hover {\n  background: rgba(212,175,55,0.08);\n  border-color: rgba(212,175,55,0.8);\n  color: #e5c84a;\n}\n.tnav-burger {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  width: 36px;\n  height: 36px;\n  background: none;\n  border: 0.5px solid rgba(255,255,255,0.15);\n  cursor: pointer;\n  padding: 8px;\n  transition: border-color 200ms ease;\n}\n.tnav-burger:hover { border-color: rgba(212,175,55,0.5); }\n.tnav-burger .bar {\n  width: 100%;\n  height: 1px;\n  background: rgba(255,255,255,0.75);\n  border-radius: 1px;\n  transition: all 280ms ease;\n  transform-origin: center;\n}\n.tnav-burger.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }\n.tnav-burger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }\n.tnav-burger.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }\n.tnav-drawer {\n  position: fixed;\n  top: 56px; left: 0; right: 0;\n  background: rgba(5,5,5,0.97);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border-bottom: 0.5px solid rgba(255,255,255,0.07);\n  z-index: 99;\n  display: flex;\n  flex-direction: column;\n  padding: 20px 28px 28px;\n  gap: 0;\n  transform: translateY(-8px);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 240ms ease, transform 240ms ease;\n}\n.tnav-drawer.open {\n  opacity: 1;\n  transform: translateY(0);\n  pointer-events: auto;\n}\n.tnav-drawer-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.55);\n  text-decoration: none;\n  padding: 16px 0;\n  border-bottom: 0.5px solid rgba(255,255,255,0.06);\n  transition: color 180ms ease;\n}\n.tnav-drawer-link:hover { color: #FAFAFA; }\n.tnav-drawer-link:last-child { border-bottom: none; }\n.tnav-drawer-auth {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: #d4af37;\n  text-decoration: none;\n  padding: 18px 0 4px;\n  margin-top: 4px;\n  transition: color 180ms ease;\n}\n.tnav-drawer-auth:hover { color: #e5c84a; }\n\n@media (max-width: 767px) {\n  .tnav-links { display: none; }\n  .tnav-auth-desktop { display: none; }\n  .tnav-burger { display: flex; }\n  .tnav { padding: 0 18px; }\n}\n@media (min-width: 768px) {\n  .tnav-drawer { display: none !important; }\n}\n";
function TopNav() {
    var _this = this;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), scrolled = _useState[0], setScrolled = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), drawerOpen = _useState1[0], setDrawerOpen = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), authed = _useState2[0], setAuthed = _useState2[1];
    // Scroll detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            var onScroll = {
                "TopNav.useEffect.onScroll": function() {
                    return setScrolled(window.scrollY > 40);
                }
            }["TopNav.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            onScroll();
            return ({
                "TopNav.useEffect": function() {
                    return window.removeEventListener('scroll', onScroll);
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], []);
    // Auth detection — check Supabase session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            var checkAuth = function checkAuth() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "TopNav.useEffect.checkAuth": function() {
                        var createClient, supabase, guestId, _ref, session, _supabase_auth_onAuthStateChange, _supabase_auth_onAuthStateChange_data, sub, unused;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "TopNav.useEffect.checkAuth": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        _state.trys.push([
                                            0,
                                            3,
                                            ,
                                            4
                                        ]);
                                        return [
                                            4,
                                            __turbopack_context__.A("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript, async loader)")
                                        ];
                                    case 1:
                                        createClient = _state.sent().createClient;
                                        supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
                                        guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
                                        return [
                                            4,
                                            supabase.auth.getSession()
                                        ];
                                    case 2:
                                        _ref = _state.sent(), session = _ref.data.session;
                                        setAuthed(!!session && session.user.id !== guestId);
                                        _supabase_auth_onAuthStateChange = supabase.auth.onAuthStateChange({
                                            "TopNav.useEffect.checkAuth": function(_e, s) {
                                                setAuthed(!!s && s.user.id !== guestId);
                                            }
                                        }["TopNav.useEffect.checkAuth"]), _supabase_auth_onAuthStateChange_data = _supabase_auth_onAuthStateChange.data, sub = _supabase_auth_onAuthStateChange_data.subscription;
                                        subscription = sub;
                                        return [
                                            3,
                                            4
                                        ];
                                    case 3:
                                        unused = _state.sent();
                                        setAuthed(false);
                                        return [
                                            3,
                                            4
                                        ];
                                    case 4:
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["TopNav.useEffect.checkAuth"]);
                    }
                }["TopNav.useEffect.checkAuth"])();
            };
            var subscription;
            checkAuth();
            return ({
                "TopNav.useEffect": function() {
                    if (subscription) subscription.unsubscribe();
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], []);
    // Close drawer on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            if (!drawerOpen) return;
            var close = {
                "TopNav.useEffect.close": function(e) {
                    var target = e.target;
                    if (!target.closest('.tnav')) setDrawerOpen(false);
                }
            }["TopNav.useEffect.close"];
            document.addEventListener('click', close);
            return ({
                "TopNav.useEffect": function() {
                    return document.removeEventListener('click', close);
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], [
        drawerOpen
    ]);
    var authHref = authed ? '/account' : '/login';
    var authLabel = authed ? 'Account' : 'Login';
    var handleAuthClick = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var createClient, supabase;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!!authed) return [
                            3,
                            3
                        ];
                        e.preventDefault();
                        return [
                            4,
                            __turbopack_context__.A("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript, async loader)")
                        ];
                    case 1:
                        createClient = _state.sent().createClient;
                        supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
                        return [
                            4,
                            supabase.auth.signOut()
                        ];
                    case 2:
                        _state.sent();
                        window.location.href = '/login';
                        _state.label = 3;
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: css
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "tnav".concat(scrolled ? ' scrolled' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "tnav-brand",
                        children: "Cutting Corners Gems"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tnav-links",
                        children: [
                            NAV_LINKS.map(function(l) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: l.href,
                                    className: "tnav-link",
                                    children: l.label
                                }, l.href, false, {
                                    fileName: "[project]/components/shared/TopNav.tsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, _this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: authHref,
                                className: "tnav-auth tnav-auth-desktop",
                                onClick: handleAuthClick,
                                children: authLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "tnav-burger".concat(drawerOpen ? ' open' : ''),
                        onClick: function() {
                            return setDrawerOpen(function(p) {
                                return !p;
                            });
                        },
                        "aria-label": "Toggle menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tnav-drawer".concat(drawerOpen ? ' open' : ''),
                children: [
                    NAV_LINKS.map(function(l) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: l.href,
                            className: "tnav-drawer-link",
                            onClick: function() {
                                return setDrawerOpen(false);
                            },
                            children: l.label
                        }, l.href, false, {
                            fileName: "[project]/components/shared/TopNav.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, _this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: authHref,
                        className: "tnav-drawer-auth",
                        onClick: function(e) {
                            setDrawerOpen(false);
                            handleAuthClick(e);
                        },
                        children: authLabel
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TopNav, "P40JqwO4AslRZ2Hy71FKtEfQ9Yc=");
_c = TopNav;
var _c;
__turbopack_context__.k.register(_c, "TopNav");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/Footer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
var footerCss = "\n.ccg-footer {\n  background: #000000;\n  border-top: 1px solid rgba(255,255,255,0.08);\n  padding: 40px 48px;\n}\n.ccg-footer-tagline {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.55);\n  margin-bottom: 28px;\n}\n.ccg-footer-content {\n  display: flex;\n  justify-content: space-between;\n  gap: 32px;\n}\n.ccg-footer-links {\n  display: flex;\n  flex-direction: column;\n}\n.ccg-footer-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.40);\n  text-decoration: none;\n  line-height: 2.0;\n  transition: color 180ms ease, font-size 150ms ease;\n}\n.ccg-footer-link:hover {\n  color: rgba(255,255,255,0.85);\n  font-size: 12.5px;\n}\n.ccg-footer-contact {\n  display: flex;\n  flex-direction: column;\n}\n.ccg-footer-contact-name {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.55);\n  line-height: 2.0;\n}\n.ccg-footer-contact-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.40);\n  text-decoration: none;\n  line-height: 2.0;\n  transition: color 180ms ease, font-size 150ms ease;\n}\n.ccg-footer-contact-link:hover {\n  color: rgba(255,255,255,0.85);\n  font-size: 12.5px;\n}\n.ccg-footer-welcome {\n  font-family: 'Comfortaa', sans-serif;\n  font-size: 11px;\n  color: rgba(255,255,255,0.40);\n  font-style: italic;\n  line-height: 2.0;\n}\n\n@media (max-width: 767px) {\n  .ccg-footer {\n    padding: 32px 24px;\n  }\n  .ccg-footer-tagline {\n    margin-bottom: 24px;\n  }\n}\n";
function Footer() {
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var path = router.pathname;
    // Don't show footer on admin or account routes
    if (path.startsWith('/admin') || path.startsWith('/account')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: footerCss
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "ccg-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-tagline",
                        children: "COLOR CONSCIOUS CAREFUL CUTTING"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-links",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/legal",
                                        className: "ccg-footer-link",
                                        children: "legal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/our-structure",
                                        className: "ccg-footer-link",
                                        children: "our structure"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "ccg-footer-link",
                                        children: "shop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/portfolio",
                                        className: "ccg-footer-link",
                                        children: "portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        className: "ccg-footer-link",
                                        children: "sign in / sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-contact",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-contact-name",
                                        children: "Michael Wall"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "tel:4802864595",
                                        className: "ccg-footer-contact-link",
                                        children: "480.286.4595"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:mwall@cuttingcornersgems.com",
                                        className: "ccg-footer-contact-link",
                                        children: "mwall@cuttingcornersgems.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-welcome",
                                        children: "texts and emails welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Footer, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileIndustrySection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/MobileIndustrySection.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileServicesCarousel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/MobileServicesCarousel.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DesktopServicesGrid$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/DesktopServicesGrid.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PhilosophySection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/PhilosophySection.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioSection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/StudioSection.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/TopNav.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/Footer.tsx [client] (ecmascript)");
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
function GlobalStyles() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
        dangerouslySetInnerHTML: {
            __html: "\n@import url('https://fonts.googleapis.com/css2?family=Oranienbaum&family=Comfortaa:wght@300;400&family=Montserrat:wght@400;500;600&display=swap');\n\n:root {\n  --font-display: 'Oranienbaum', Georgia, serif;\n  --font-subtitle: 'Montserrat', sans-serif;\n  --font-body: 'Comfortaa', sans-serif;\n  --font-ui: 'Montserrat', sans-serif;\n  --font-mono: 'Courier New', monospace;\n}\n\nhtml, body, #__next {\n  font-family: var(--font-body);\n  background-color: #050505;\n  color: #FAFAFA;\n  margin: 0;\n  padding: 0;\n  -webkit-font-smoothing: antialiased;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: var(--font-subtitle);\n}\n\n.hero-glow {\n  background: radial-gradient(\n    circle at 50% 50%,\n    rgba(56, 189, 248, 0.08) 0%,\n    rgba(0, 0, 0, 0) 50%\n  );\n  pointer-events: none;\n}\n\n.delay-100 { animation-delay: 100ms; }\n.delay-200 { animation-delay: 200ms; }\n.delay-300 { animation-delay: 300ms; }\n.delay-400 { animation-delay: 400ms; }\n.delay-500 { animation-delay: 500ms; }\n\n.title-xl {\n  font-family: var(--font-display);\n  font-size: 3rem;\n  line-height: 1.2;\n  letter-spacing: 0.04em;\n  font-weight: 400;\n}\n\n.hero-title {\n  font-family: var(--font-display);\n  font-size: 4.5rem;\n  line-height: 1.1;\n  letter-spacing: 0.04em;\n  font-weight: 400;\n}\n\n.title-sm {\n  font-family: var(--font-subtitle);\n  font-weight: 500;\n}\n\n.name-title {\n  font-size: 7rem;\n  font-family: var(--font-display);\n  font-weight: 400;\n}\n\n.spec-text {\n  font-family: var(--font-mono);\n  text-transform: uppercase;\n  letter-spacing: 0.2em;\n}\n\n.page-title {\n  font-family: var(--font-display);\n}\n\n.container-custom {\n  max-width: 80rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n@media (min-width: 768px) {\n  .container-custom {\n    padding-left: 3rem;\n    padding-right: 3rem;\n  }\n}\n\n.section-spacing {\n  padding-top: 6rem;\n  padding-bottom: 6rem;\n}\n\n@media (min-width: 768px) {\n  .section-spacing {\n    padding-top: 8rem;\n    padding-bottom: 8rem;\n  }\n}\n\n.gem-card {\n  background-color: #101010;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  transition: all 0.5s ease;\n  overflow: hidden;\n  position: relative;\n}\n\n.gem-card:hover {\n  border-color: rgba(255, 255, 255, 0.20);\n  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);\n}\n\n@media (max-width: 767px) {\n  .gem-card:active {\n    border-color: rgba(245, 158, 11, 0.5);\n  }\n}\n\n.hover-lift {\n  transition: transform 0.3s ease;\n}\n\n.hover-lift:hover {\n  transform: translateY(-6px);\n}\n\n.btn-primary {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 0.75rem 2rem;\n  font-family: var(--font-ui);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.15em;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-decoration: none;\n  border: none;\n  cursor: pointer;\n}\n\n.btn-primary:hover {\n  background-color: #e5e5e5;\n}\n\n.btn-secondary {\n  background-color: transparent;\n  color: #FAFAFA;\n  padding: 0.75rem 2rem;\n  font-family: var(--font-ui);\n  text-transform: uppercase;\n  letter-spacing: 0.15em;\n  font-size: 0.875rem;\n  border: 1px solid rgba(255, 255, 255, 0.20);\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.btn-secondary:hover {\n  border-color: rgba(255, 255, 255, 1);\n  background-color: rgba(255, 255, 255, 0.05);\n}\n\n@media (max-width: 767px) {\n  .hero-title {\n    font-size: 2.4rem;\n  }\n  .page-title.title-xl {\n    font-size: 2rem !important;\n  }\n  .name-title {\n    font-size: 2rem !important;\n  }\n  .section-spacing {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n  }\n  .container-custom {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  #services-section {\n    padding-top: 0 !important;\n  }\n}\n\n@keyframes fade-in {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in {\n  animation: fade-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n\n@keyframes scrollPulse {\n  0%, 100% { opacity: 0.4; transform: scaleY(1); }\n  50% { opacity: 1; transform: scaleY(1.15); }\n}\n"
        }
    }, void 0, false, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = GlobalStyles;
function Home() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": function() {
            var groups = document.querySelectorAll('[data-reveal-group]');
            groups.forEach({
                "Home.useEffect": function(group) {
                    var elements = group.querySelectorAll('[data-scroll-reveal]');
                    elements.forEach({
                        "Home.useEffect": function(el, i) {
                            var h = el;
                            h.style.opacity = '0';
                            h.style.transform = 'translateY(80px)';
                            h.dataset.revealIndex = String(i);
                        }
                    }["Home.useEffect"]);
                }
            }["Home.useEffect"]);
            var observer = new IntersectionObserver({
                "Home.useEffect": function(entries) {
                    entries.forEach({
                        "Home.useEffect": function(entry) {
                            if (entry.isIntersecting) {
                                var el = entry.target;
                                var index = parseInt(el.dataset.revealIndex || '0');
                                var delay = index * 100;
                                setTimeout({
                                    "Home.useEffect": function() {
                                        el.style.transition = 'opacity 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                        el.style.opacity = '1';
                                        el.style.transform = 'translateY(0)';
                                    }
                                }["Home.useEffect"], delay);
                                observer.unobserve(el);
                            }
                        }
                    }["Home.useEffect"]);
                }
            }["Home.useEffect"], {
                threshold: 0.05,
                rootMargin: '0px 0px 180px 0px'
            });
            document.querySelectorAll('[data-scroll-reveal]').forEach({
                "Home.useEffect": function(el) {
                    return observer.observe(el);
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": function() {
                    return observer.disconnect();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalStyles, {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            minHeight: '100svh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hero-glow"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-1 bg-cover",
                                style: {
                                    backgroundImage: 'url(/assets/Chair.jpeg)',
                                    backgroundPosition: '62% 40%',
                                    opacity: '0.4'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                style: {
                                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,5,0.55) 20%, rgba(5,5,5,0.85) 90%, rgba(5,5,5,0.98) 100%)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                style: {
                                    background: 'linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.20) 30%, rgba(5,5,5,0.20) 70%, rgba(5,5,5,0.98) 100%)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "container-custom relative z-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "uppercase text-gray-400 mb-6 opacity-0 animate-fade-in transition-all duration-1000 delay-500",
                                        style: {
                                            fontSize: '14px',
                                            letterSpacing: '0.37em'
                                        },
                                        "data-scroll-reveal": true,
                                        children: "Tempe, Arizona"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "hero-title title-xl tracking-tight mb-9 opacity-10 animate-fade-in delay-1000 duration-2000",
                                        "data-scroll-reveal": true,
                                        style: {
                                            animationDelay: '92000ms'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#d4af37'
                                                },
                                                children: "Cutting"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 311,
                                                columnNumber: 15
                                            }, this),
                                            " Corners -- Not the",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#d4af37'
                                                },
                                                children: "Quality"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 312,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-1000 tracking-tight max-w-3xl mx-auto mb-10 opacity-0 animate-drop-in delay-1000 duration-200",
                                        style: {
                                            fontSize: '23px',
                                            lineHeight: 1.6
                                        },
                                        children: "Professional gemstone cutter focused on color, yield, and stone potential for jewelry professionals nationwide."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-05 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-8 right-8 hidden md:flex flex-col justify-center",
                                style: {
                                    width: '12rem',
                                    height: '12rem',
                                    backgroundColor: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    padding: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "spec-text text-gray-500 mb-1",
                                        style: {
                                            fontSize: '11px'
                                        },
                                        children: "Industry for"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "title-sm text-white",
                                        style: {
                                            fontSize: '1.875rem'
                                        },
                                        children: "13 Years"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        style: {
                                            fontSize: '0.875rem'
                                        },
                                        children: "Cutting for Seven"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileIndustrySection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PhilosophySection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioSection$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "services-section",
                        "data-reveal-group": true,
                        style: {
                            minHeight: "100svh",
                            display: "flex",
                            alignItems: "center",
                            paddingTop: "6rem",
                            paddingBottom: "6rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container-custom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "services-sticky-header",
                                    className: "text-center",
                                    style: {
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 20,
                                        background: '#050505',
                                        paddingTop: '28px',
                                        paddingBottom: '3px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "uppercase mb-3 text-center",
                                            style: {
                                                fontSize: '13px',
                                                letterSpacing: '0.20em',
                                                color: 'rgba(255,255,255,0.52)'
                                            },
                                            children: "What I Do"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "title-xl text-center",
                                            style: {
                                                fontSize: 'clamp(28px, 3.5vw, 56px)',
                                                letterSpacing: '-0.01em',
                                                marginBottom: '0px'
                                            },
                                            children: "Services"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 385,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 363,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DesktopServicesGrid$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileServicesCarousel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "data-reveal-group": true,
                        style: {
                            minHeight: "100svh",
                            display: "flex",
                            alignItems: "center",
                            paddingTop: "6rem",
                            paddingBottom: "6rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container-custom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "uppercase text-gray-500 mb-4 text-center",
                                    style: {
                                        fontSize: '12px',
                                        letterSpacing: '0.20em'
                                    },
                                    children: "About"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "title-xl tracking-tight mb-16 text-center",
                                    children: "The Cutter"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "opacity-0 transition-all duration-700",
                                            "data-scroll-reveal": true,
                                            style: {
                                                animationDelay: '100ms'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    aspectRatio: '1 / 1',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    borderRadius: '18px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/assets/Cutter.jpeg",
                                                        alt: "Michael Wall at work",
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'center top',
                                                            transform: 'scale(1.1)',
                                                            display: 'block'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            inset: 0,
                                                            boxShadow: 'inset 0 0 30px 15px rgba(0,0,0,0.7)',
                                                            zIndex: 10,
                                                            pointerEvents: 'none'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 417,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "page-title title-xl name-title mb-6 opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        animationDelay: '100ms'
                                                    },
                                                    children: "Michael Wall"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        fontFamily: 'var(--font-body)',
                                                        fontSize: '17px',
                                                        lineHeight: 1.75,
                                                        color: 'rgba(255,255,255,0.68)',
                                                        maxWidth: '520px',
                                                        marginBottom: '24px',
                                                        animationDelay: '200ms'
                                                    },
                                                    children: "Based in Tempe, Arizona, I've been part of the gemstone industry since 2013, transitioning from amateur enthusiast to professional cutter in 2021. My focus is on med-high weight retention cuts that maximize both value and beauty."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        fontFamily: 'var(--font-body)',
                                                        fontSize: '17px',
                                                        lineHeight: 1.75,
                                                        color: 'rgba(255,255,255,0.68)',
                                                        maxWidth: '520px',
                                                        marginBottom: '32px',
                                                        animationDelay: '231ms'
                                                    },
                                                    children: "I work closely with jewelers across the industry, specializing in natural colored gemstones including sapphires, tourmalines, emeralds, tanzanites, and more. Whether you need a custom cut, re-polish, or expert consultation, I'm here to deliver results that exceed expectations."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col sm:flex-row gap-4 mt-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "/portfolio",
                                                            className: "btn-primary",
                                                            children: "View Portfolio"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 502,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "tel:4802864595",
                                                            className: "btn-secondary",
                                                            children: "Call 480-286-4595"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 454,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "section-spacing relative overflow-hidden",
                        style: {
                            backgroundColor: '#0A0A0A'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hero-glow pointer-events-none",
                                style: {
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 520,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "container-custom relative z-10 text-center",
                                style: {
                                    maxWidth: '880px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "page-title title-xl mb-8 opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            animationDelay: '30ms'
                                        },
                                        children: "Ready to Start?"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mx-auto mb-12 opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '23px',
                                            lineHeight: 1.75,
                                            color: 'rgba(255,255,255,0.70)',
                                            maxWidth: '600px',
                                            animationDelay: '200ms'
                                        },
                                        children: "Whether you have a rough stone waiting to be transformed or need expert advice on your next project, I'm here to help."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "btn-primary opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            borderRadius: '999px',
                                            padding: '16px 40px',
                                            fontSize: '14px',
                                            animationDelay: '300ms'
                                        },
                                        children: [
                                            "Browse Shop",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 560,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 522,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 516,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlobalStyles");
__turbopack_context__.k.register(_c1, "Home");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1bbf4153._.js.map